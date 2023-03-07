import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import * as dotenv from "dotenv";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // This function will be called after the user successfully authenticates with Google.
      // Here, you can create or update the user's account in your database.
      return done(null, profile);
    }
  )
);
// import * as dotenv from "dotenv";
// import bcrypt from "bcrypt";
// import { User } from "../models/user.js";
// import { OAuth2Client } from "google-auth-library";
// import keys from "../oath_keys.json";

// const { CLIENT_SECRET } = process.env;

// function getAuthenticatedClient() {
//   return new Promise((resolve, reject) => {
//     // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
//     // which should be downloaded from the Google Developers Console.
//     const oAuth2Client = new OAuth2Client(
//       keys.web.client_id,
//       keys.web.client_secret,
//       keys.web.redirect_uris[0]
//     );

//     // Generate the url that will be used for the consent dialog.
//     const authorizeUrl = oAuth2Client.generateAuthUrl({
//       access_type: "offline",
//       scope: "https://www.googleapis.com/auth/userinfo.profile",
//     });

//     // Open an http server to accept the oauth callback. In this simple example, the
//     // only request to our webserver is to /oauth2callback?code=<code>
//     const server = http
//       .createServer(async (req, res) => {
//         try {
//           if (req.url.indexOf("/oauth2callback") > -1) {
//             // acquire the code from the querystring, and close the web server.
//             const qs = new url.URL(req.url, "http://localhost:3000")
//               .searchParams;
//             const code = qs.get("code");
//             console.log(`Code is ${code}`);
//             res.end("Authentication successful! Please return to the console.");
//             server.destroy();

//             // Now that we have the code, use that to acquire tokens.
//             const r = await oAuth2Client.getToken(code);
//             // Make sure to set the credentials on the OAuth2 client.
//             oAuth2Client.setCredentials(r.tokens);
//             console.info("Tokens acquired.");
//             resolve(oAuth2Client);
//           }
//         } catch (e) {
//           reject(e);
//         }
//       })
//       .listen(3000, () => {
//         // open the browser to the authorize url to start the workflow
//         open(authorizeUrl, { wait: false }).then((cp) => cp.unref());
//       });
//     destroyer(server);
//   });
// }

// export const loginController = async (req, res) => {
//   const oAuth2Client = await getAuthenticatedClient();
//   // Make a simple request to the People API using our pre-authenticated client. The `request()` method
//   // takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios.
//   const url = "https://people.googleapis.com/v1/people/me?personFields=names";
//   const res = await oAuth2Client.request({ url });
//   console.log(res.data);

//   // After acquiring an access_token, you may want to check on the audience, expiration,
//   // or original scopes requested.  You can do that with the `getTokenInfo` method.
//   const tokenInfo = await oAuth2Client.getTokenInfo(
//     oAuth2Client.credentials.access_token
//   );
//   console.log(tokenInfo);
// };

// export const loginController = async (req, res) => {
//   const { email, name, photoURL } = req.body;
//   const registeredUser = await User.findOne({ email });
//   if (registeredUser) {
//     const payload = { id: registeredUser._id };
//     const token = jwt.sign(payload, CLIENT_SECRET);
//     const user = await User.findByIdAndUpdate(registeredUser._id, { token });
//     res.status(200).json({
//       data: {
//         user: {
//           name: user.name,
//           email: user.email,
//           photoURL: user.photoURL,
//         },
//         token,
//       },
//     });
//   }
//   const hashPassword = await bcrypt.hash(Date.now().toString(), 10);
//   const user = await User.create({
//     name,
//     email,
//     password: hashPassword,
//   });
//   const payload = {
//     id: user._id,
//   };
//   const token = jwt.sign(payload, CLIENT_SECRET);

//   await User.findByIdAndUpdate(user._id, { token });
//   res.status(201).json({
//     data: {
//       user: { name, email, photoURL },
//       token,
//     },
//   });
// };
