import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/AuthSlice";
import useToast from '../hooks/useToast';
import GoogleSignInServices from '../services/user/GoogleSignInServices';


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleSignIn = () => {
  const showToast = useToast()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const handleSuccess = async (data) => {
    try{
      console.log("Google Sign-In Success:", data);
      const access_token = data.credential
      const response = await GoogleSignInServices(access_token)

      const { access, refresh, user } = response;
      
        
        dispatch(
          setUser({
            email: user.email, 
            firstName: user.first_name || '', 
            lastName: user.last_name || '',
            accessToken: access,
            refreshToken: refresh,
            profileImage: user.image || '',
            role: user.role,
            registerMode: user.register_mode,
          })
        );

      showToast(response.message, "success");
      navigate("/");
    }
    catch (error) {
      console.log('Some error while sending google token to backend', error);
    }
  };

  const handleFailure = (error) => {
    showToast( "An error occurred while google sign in.", "error");
    console.error("Google Sign-In Error:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleFailure}
      text="Sign in with Google"
      width="300px"
      theme="outline"
      shape="pill"
      
    />
  </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
