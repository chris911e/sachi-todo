const Header = () => {
  const headerStyle = {
    padding: "20px 0",
    lineHeight: "1.5em",
  };

  return (
    <header style={headerStyle}>
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "600",
          marginBottom: "2rem",
          lineHeight: "1em",
          color: "#ececec",
          textAlign: "center",
        }}

        data-test='todo-header'
      >
        SaChi ToDo List
      </h1>
    </header>
  );
};

export default Header;
