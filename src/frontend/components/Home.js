import {
  Link
} from "react-router-dom";
import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import { Row, Col, Card, Button,  } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <>
              <Container fluid className='bkgrud'>
              </Container>
            <Container fluid className="Front-container">
              <Row>
                <Col xs={1}></Col>
                <Col className="row-front row-front-left m-auto" xs>
                  <h1>Discover, collect, and sell extraordinary NFTs</h1>
                  <br/>
                  <h5>OpenSea is the world's first and largest NFT marketplace</h5>
                  <br/>
                  <br/>
                  <Row>
                    <Col><Button variant="secondary" size="lg">Explore</Button></Col>
                    <Col><Button variant="outline-primary" size='lg'><Link to="../create">Create</Link></Button></Col>
                  </Row>
                </Col>
                <Col className="row-front" xs><Card style={{ width: '79%' }}>
                  <Card.Img variant="top" src="https://openseauserdata.com/files/otherside_launch_image_rc1.jpeg" />
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <Col xs={2}>
                        <Card.Img className="userimage" src="https://openseauserdata.com/files/otherside_launch_creator_image_rc1.jpeg" />
                        </Col>
                        <Col>
                        Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card></Col>
              </Row>
            </Container>
          </>
        )}
    </div>
  );
}
export default Home