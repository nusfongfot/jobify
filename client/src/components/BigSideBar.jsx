import Logo from "../assets/wrappers/Logo";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

import styled from "styled-components";

function BigSideBar() {
  return (
    <Wrapper className="min-vh-100 d-flex flex-column align-items-center">
      <div className="mt-3">
        <Logo />
      </div>
      <nav className="d-flex flex-column justify-content-center mt-5 gap-3">
        {links.map((item) => {
          return (
            <NavLink
              className="hover-link text-white d-flex align-items-center text-decoration-none gap-3"
              key={item.id}
              to={item.path}
            >
              <span>{item.icon}</span>
              {item.text}
            </NavLink>
          );
        })}
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: var(--box);
  .hover-link:hover {
    transform: translate(5px,0);
  }
`;
export default BigSideBar;
