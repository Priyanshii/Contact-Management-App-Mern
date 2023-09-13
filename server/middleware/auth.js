import axios from 'axios';

const auth = async(req, res, next) => {
  const token = req.headers["x-access-token"];

  if(!token) {
    return res.status(401).json({ message: "Please Login to access." });
  }

  try { 
    const decodedData = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);

    req.userId = decodedData?.sub;
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}

export default auth;
