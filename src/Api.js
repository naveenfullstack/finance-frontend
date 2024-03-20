const Domain = "http://localhost:9001"
const requests = {

  //Headers
  key : process.env.REACT_APP_API_KEY,
  authantication : process.env.REACT_APP_AUTHANTICATION,

  //API Urls
  login : `${Domain}/auth/login`,
  signup : `${Domain}/auth/signup`
};

export default requests;