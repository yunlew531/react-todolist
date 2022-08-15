export default () => {
  const emailValidate = (email?: string) => {
    // eslint-disable-next-line
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return email && emailRegex.test(email) ? '' : '請確認 Email 是否正確!';
  };

  const passwordValidate = (password?: string) => (password && password.length >= 8 ? '' : '密碼至少要 8 個字!');

  const passwordCheckValidate = (password?: string, passwordCheck?: string) => {
    if (password && passwordCheck && (password === passwordCheck)) { return ''; }
    return '請檢查!與密碼不一致!';
  };

  const nickNameValidate = (nickname?: string) => (nickname && nickname.length >= 2 ? '' : '暱稱至少要 2 個字!');

  return {
    emailValidate,
    passwordValidate,
    passwordCheckValidate,
    nickNameValidate,
  };
};
