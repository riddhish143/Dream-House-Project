class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <style>
      nav {
        background-color: #333;
        color: white;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 9999;
        flex: 1 1 auto;
      }
      header{
        background-color: #333;
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
      }
      nav a {
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
      }
      nav a:hover {
        color: #4caf50;
      }
      nav ul {
        list-style-type: none;
        display: flex;
      }
      
      nav ul li {
        margin: 0 10px;
        position: relative;
      }
      
      nav ul li a {
        color: white;
        text-decoration: none;
        padding: 10px;
        display: block;
      }
      
      nav ul li ul {
        display: none;
        position: absolute;
        top: 40px;
        left: 0;
        background-color: #333;
      }
      
      nav ul li:hover ul {
        display: block;
      }
      #dropdown_list {
         display: none;
      }
      nav ul li:hover ul li:hover #dropdown_list {
          display: block;
      }
      header ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      nav ul li ul li {
        width: auto;
        padding: 7px;
        margin: 0;
        border-bottom: 1px solid white;
        font-size: 14px;
      }
      
      footer {
        background-color: #333;
        color: #fff;
        text-align: center;
        padding: 20px;
      }
      
      img {
        display: block;
        margin: 0 auto 20px auto;
      }
    </style>
      <nav>
          <header>
              <h1>DreamHome Rental Business</h1>
              <ul>
                  <li><a href="index.html">Home</a></li>

                  <li><a href="#">Forms</a>
                    <ul>
                      <li><a href="/BranchForm">Branches_reg</a></li>
                      <li><a href="/staffReg">Staff_reg</a></li>
                      <li><a href="/ClientReg">Client_reg</a></li>
                      <li><a href="/LeaseForm">Lease</a></li>
                      <li><a href="/AdvertisementForm">Advertisement_Form</a></li>
                      <li>
                      <a href="#">Property</a>
                        <ul id="dropdown_list">
                          <li><a href="/PropRegForm">Register</a></li>
                          <li><a href="/OwnerForm">Owners</a></li>
                          <li><a href="/PropViewReport">View Report</a></li>
                        </ul>
                     
                    </li>
                    </ul>
                  </li> 

                  <li><a href="#">Tables</a>
                      <ul>
                          <li><a href="/BranchList">Branches</a></li>
                          <li><a href="/ClientReport">Client_Reg</a></li>
                          <li><a href="/LeaseReport">Lease_Form</a></li>
                          <li><a href="/OwnerReport">Prop_Oweners</a></li>
                          <li><a href="/PropRegReport">Prop_Reg_Form</a></li>
                          <li><a href="/PropReport">Prop_View_Report</a></li>
                          <li><a href="/StaffReport">Staff_Reg_Form</a></li>
                          <li><a href="/Advertisements">Advertisements</a></li>
                      </ul>
                  </li>
                  <li><a href="Quries.html">Quries</a></li>
              </ul>
          </nav>
      </header> `;
  }
}
customElements.define("header-component", Header);
