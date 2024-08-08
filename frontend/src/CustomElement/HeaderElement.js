// Create a class for the element
// const header = document.createElement("div");
const style = `
<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: beige;
}

.welComeNote {
  font-size: 1.2em;
  color: #1b1a1a;
  font-weight: bold;
}

.dropButton {
  padding: 13px 13px;
  font-size: 1em;
  color: #fff;
  background-color: rgb(119, 230, 245);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 30px;
  font-weight: bold;
}

.dropContain {
  display: none;
  position: fixed;
  z-index: 10000;
  right: 20px;
  flex-direction: column;
  border-radius: 30px;
  color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 150px;
  background-color: white;
  padding: 15px;
}

.dropDown:hover .dropContain {
  display: flex;
  align-items: center;
  justify-content: center;
}

.profileSettingBtn {
  font-size: 1em;
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px 16px;
  margin: 10px 3px;
  border-radius: 4px;
}

.profileSettingBtn:hover {
  background-color: #ddd;
}

.logoutButton {
  padding: 10px 33px;
  font-size: 1em;
  color: #fff;
  background-color: rgb(245, 119, 119);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logoutIcon {
  margin-left: 5px;
  font-size: 1.2em;
  vertical-align: middle;
}

.logoutButton:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>`;

class HeaderElement extends HTMLElement {
  constructor() {
    super();
    const hoverDisabled = this.getAttribute("hoverDisabled");
    console.log("🚀 ~ HeaderElement ~ constructor ~ this.hoverDisabled:", hoverDisabled);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
                                ${style}
                                <div class="header">
                                 <p class="welComeNote"><slot name="headerTitle" /></p>
                                 <div class="dropDown">
                                   <button class="dropButton">
                                     <slot name="buttonTitle"></slot>
                                     <slot name="email" />
                                   </button>
                                   <div class="dropContain">
                                     <button class="profileSettingBtn" type="submit">Profile Settings</button>
                                     <button class="logoutButton" type="submit">
                                       <slot name="logout" />
                                     </button>
                                   </div>
                                 </div>
                                </div>`;
  }

  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.querySelector(".profileSettingBtn").addEventListener("click", () => {
      if (this.navigate) {
        this.navigate("/userprofile");
      }
    });
    this.shadowRoot.querySelector(".logoutButton").addEventListener("click", () => {
      if (this.logout) {
        this.logout();
      }
    });
  }
}

customElements.define("header-element", HeaderElement);
