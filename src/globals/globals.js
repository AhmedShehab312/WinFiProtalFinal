
var globalsVariable = {
  languages: [],
  loggedIn: false,
  roles: [{ id: 1, name: "OWNER" }, { id: 2, name: "ADMIN" }]

};


export const setLang = lang => {
  globalsVariable["currentLang"] = lang;
};

export const getlang = () => {
  return globalsVariable["currentLang"];
};

export const setVariable = (key, value) => {
  globalsVariable[key] = value;
};

export const getVariable = key => {
  return globalsVariable[key];
};


export const setLoggedIn = _loggedIn => {
  localStorage.setItem('loggedIn', _loggedIn.toString());
  globalsVariable["loggedIn"] = _loggedIn;
};

export const getLoggedIn = async () => {
  let res = await localStorage.getItem('loggedIn');
  return res
  // return globalsVariable["loggedIn"];
};


export const displayToast = (errMsg, success = false) => {
  var errDiv = document.getElementById("errorDiv");
  errDiv.style.display = "block";
  if (success) {
    errDiv.style.backgroundColor = "#4d9a60";
    errDiv.style.color = "#155724";
  }
  document.getElementById("errorTxt").innerText = errMsg;
  setTimeout(() => {
    errDiv.style.display = "none";
  }, 3000);
};


