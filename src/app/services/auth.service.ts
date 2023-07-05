import { Injectable, NgZone } from '@angular/core';
import { User } from '../shared/User'
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userData: any; // Save logged in user data
    errorCodeSubject = new Subject()

    constructor(
        public afs: AngularFirestore, // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone,
        private http: HttpClient// NgZone service to remove outside scope warning
    ) {
        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.userData = user;
                sessionStorage.setItem('id', user.uid)
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user')!);

            } else {
                localStorage.setItem('user', 'null');
                JSON.parse(localStorage.getItem('user')!);
            }
        });
    }

    // Sign up with email/password

    //   signUp(email: string, password: string): Observable<any> {
    //     return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZ7xGXG5X6LXELM2_qJxLMwB5ta8blYO4',
    //       { email, password, returnSecureToken: true }).pipe(catchError(this.getErrorHandler))
    //   }

    // SignUp(email: string, password: string){
    //      this.afAuth.createUserWithEmailAndPassword(email, password)
    // }

    SignUp(email: string, password: string) {
        return this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign 
                up and returns promise */
                // this.SendVerificationMail();
                this.SetUserData(result.user);
                console.log(result.user?.uid);
                this.router.navigate(['menu']);
            })
            .catch((error) => {
                this.errorHandling(error)
            });
    }





    // Sign in with email/password

    // login(email: string, password: string): Observable<any> {
    //     return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ7xGXG5X6LXELM2_qJxLMwB5ta8blYO4`,
    //       { email, password, returnSecureToken: true }).pipe(catchError(this.getErrorHandler))
    //   }

    //   getErrorHandler(errorRes: HttpErrorResponse): Observable<never> {
    //     let errorMessage = 'Некоректний пароль або електронна пошта'
    //     if (!errorRes.error || !errorRes.error.error) {
    //       return throwError(errorMessage);
    //     }
    //     switch (errorRes.error.error.message) {
    //       case 'EMAIL_EXISTS':
    //         errorMessage = 'Така електронна пошта вже існує';
    //         break;
    //       case 'EMAIL_NOT_FOUND':
    //         errorMessage = 'Електронну пошту не знайдено';
    //         break;
    //       case 'INVALID_PASSWORD':
    //         errorMessage = 'Неправильний пароль';
    //         break;
    //     }
    //     return throwError(errorMessage)
    //   }

    SignIn(email: string, password: string) {
        return this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.SetUserData(result.user);
                // console.log(result.user)
                this.afAuth.authState.subscribe((user) => {
                    if (user) {
                        console.log(user)
                        this.router.navigate(['menu']);
                    }
                });
            })
            .catch((error) => {
                this.errorHandling(error)
            });
    }



    // Send email verfificaiton when new user sign up
    // SendVerificationMail() {
    //     return this.afAuth.currentUser
    //         .then((u: any) => u.sendEmailVerification())
    //         .then(() => {
    //             this.router.navigate(['verify-email-address']);
    //         });
    // }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail: string) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            })
            .catch((error) => {
                window.alert(error);
            });
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user !== null && user.emailVerified !== false ? true : false;
    }

    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
            this.router.navigate(['dashboard']);
        });
    }

    // Auth logic to run auth providers
    AuthLogin(provider: any) {
        return this.afAuth
            .signInWithPopup(provider)
            .then((result) => {
                this.router.navigate(['menu']);

                this.SetUserData(result.user);
            })
            .catch((error) => {
                window.alert(error);
            });
    }

    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
        );
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            // photoURL: user.photoURL,
            phone: 55,
            cart: [],
            address: 'address'


        };
        return userRef.set(userData, {
            merge: true,
        });
    }

    // Sign out
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['sign-in']);
        });
    }


    errorHandling(error: any) {
        let errorCode = error.code;
        let errorMessage = '';
        switch (errorCode) {
            case 'auth/invalid-email':
                errorMessage = 'Неправильна електронна пошта';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'Електронна пошта вже використовується';
                break;
            case 'operation-not-allowed':
                errorMessage = 'Операцію відхилено';
                break;
            case 'auth/weak-password':
                errorMessage = 'Слабкий пароль';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Пароль неправильний';
                break;
                case 'auth/too-many-requests':
                    errorMessage = 'Ваш аккаунт тимчасово заблокований, спробуйте пізнеше';
                    break;
            default:
                errorMessage = 'Помилка';
                break;
        }
        this.errorCodeSubject.next(errorMessage)
    }
}