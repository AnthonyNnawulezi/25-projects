function FormValidation() {
  function onSubmit() {}

  return (
    <div>
      <h1>Simple Form Validation</h1>
      <div className="form-container">
        <form action="" onSubmit={onSubmit} method="post">
          <div className="form-wrapper">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="email">User Name</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-wrapper">
            <label htmlFor="username">User Name</label>
            <input type="text" id="password" password="Enter your password" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FormValidation;
