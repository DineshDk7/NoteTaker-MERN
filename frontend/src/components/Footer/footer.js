import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer  style={{
      width : '100%',
      bottom : "10px",
      display : "flex",
      justifyContent : "center",
    }}>
      {/* <Container> */}
        <Row>
          <Col className="text-center py-3">Copyrights &copy; Note Taker</Col>
        </Row>
      {/* </Container> */}
    </footer>
  )};

export default Footer;
