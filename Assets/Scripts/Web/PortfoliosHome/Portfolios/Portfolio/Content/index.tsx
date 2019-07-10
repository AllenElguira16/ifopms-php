import * as React from 'react';
import {
  Container, Card, Col
} from 'reactstrap';
import Axios from 'axios';

class Content extends React.Component<any, any>{
  state: any = {
    images: []
  }
  componentDidMount(){
    let {portfolio} = this.props;
    Axios.post(`/api/portfolio/content`, {id: portfolio.userId, title: portfolio.title}).then((res: any) => {
      this.setState({
        images: res.data
      })
    });
  }
  render(){
    let {images} = this.state;
    let {portfolio} = this.props;
    return(
      <Container>
        <div className="row justify-content-between">
          {images.length && images.map((image: any, i: number) => 
            <Col sm={3} key={i} style={{height: 200}}>
              <img className="h-100" src={`/uploads/portfolios/${portfolio.userId}/${portfolio.title}/${image.name}`} alt=""/>
            </Col>
          )}
        </div>
        {/* <Card tag={Link} to={`/portfolio/${portfolio.id}`} title={portfolio.title} className="shadow text-decoration-none text-dark p-2">
          <CardImg top src={`/uploads/preview/${portfolio.userId}/${portfolio.title}/${portfolio.preview}`} className="img-fluid" style={{ height: 200 }} />
          <CardBody className='p-0'>
            <PortfolioStatus className="d-flex px-0 py-2 justify-content-end" portfolio={portfolio} />
          </CardBody>
        </Card> */}
      </Container>
    );
  }
}
export default Content;