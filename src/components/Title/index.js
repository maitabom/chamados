import "./title.css";

function Title({ children, name }) {
  return (
    <div className="Title">
      {children}
      <span>{name}</span>
    </div>
  );
}

export default Title;
