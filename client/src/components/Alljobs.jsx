import { useJob } from "../context/jobContext";
import styled from "styled-components";

function Alljobs() {
  const { jobs, setJobs } = useJob();
  return (
    <Wrapper>
      {jobs.map((item) => {
        return (
          <div key={item._id} className="d-flex box flex-wrap text-dark align-items-center justify-content-center">
            <div className="d-flex gap-3 w-50">
              <h5>company: {item.company}</h5>
              <h5>position: {item.position}</h5>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
align-items: center;
width: 100%;
height: auto;
  .box {
    background: var(--grey-50);
    margin-top: 10px;   
  }
`;
export default Alljobs;
