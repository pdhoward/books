
//////////////////////////////////////////////////////////////////////////
/////////////////    Container for the Books App        //////////////////
////////////////////////////////////////////////////////////////////////

import React    from "react";
import Navbar   from "./common/Navbar";
import Footer   from "./common/Footer";

const App = props => (
  <div>
    <Navbar />
    {props.children}
    <Footer />
  </div>
);

export default App;
