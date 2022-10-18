import {createContext} from "react";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = createContext(null);

export default UserContext;
