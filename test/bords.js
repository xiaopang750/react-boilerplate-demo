import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
let should = chai.should();

describe('API Test', () => {
  it('should return valid bords data', (done) => {
    chai.request(server)
      .get('/api/bords')
      .end((err, res) => {
        res.statusCode.should.equal(200);
        let body = res.body;
        body.retCode.should.equal(200);
        body.data.should.be.a('array');
        let item = body.data[0];
        item.should.be.a('object');
        for (let attr of ['id', 'name', 'filters']) {
          should.exist(item[attr]);
        }
        done();
      });
  });
});
