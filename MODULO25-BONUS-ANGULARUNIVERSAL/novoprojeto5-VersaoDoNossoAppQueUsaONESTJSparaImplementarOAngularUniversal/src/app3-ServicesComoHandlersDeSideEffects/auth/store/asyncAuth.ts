









// export const authAttempt = (email, password, isSignup) => {
//     return (dispatch) => {
//       dispatch(authStart());
//       const authData = {
//         email: email,
//         password: password,
//         returnSecureToken: true, 
//       };
//       let url =
//         'https:
//       if (!isSignup) {
//         url =
//           'https:
//       }
//       axios
//         .post(url, authData) 
//         .then((response) => {
//           console.log(response);
//           const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); 
//           console.log(expirationDate);
//           localStorage.setItem('token', response.data.idToken);
//           localStorage.setItem('expirationDate', expirationDate);
//           localStorage.setItem('userId', response.data.localId);
//           localStorage.setItem('email', response.data.email )
//           dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.email));
//           dispatch(checkAuthTimeout(response.data.expiresIn));
//         })
//         .catch((error) => {
//           console.log(error);
//           dispatch(authFail(error.response.data.error));
//         });
//     };
//   };