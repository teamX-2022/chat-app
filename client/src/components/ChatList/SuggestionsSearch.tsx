import { Avatar, Button, Col, Row } from "antd";


export default function SuggestionsSearch() {
    return (
        <div className="suggestion-search">
            <Row>
                <Col span={4}>
                    <Avatar>aaa</Avatar>
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center' }} span={13}>
                    <h5 style={{ marginBottom: '0px' }}>NAME</h5>
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'row-reverse' }} span={7}>
                    <Button>Kết bạn</Button>
                </Col>
            </Row>
        </div>
    )
}