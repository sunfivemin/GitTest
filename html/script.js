function checkLogin() {
  const id = document.getElementById("txt_id").value;

  if (id === "") {
    alert("아이디를 입력해주세요.");
  } else {
    alert("입력한 아이디는 " + id + "입니다.");
  }
}

function myFunction(msg) {
  alert("비밀번호");
  console.log(msg);
}
