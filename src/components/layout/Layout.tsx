import { Col, Row } from "antd";
import { FC, ReactElement } from "react";

interface LayoutProps {
    children: ReactElement
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <Row justify="start">
            <Col
                xs={{ span: 20, offset: 2 }}
                xl={{ span: 12, offset: 6 }}
            >
                {children}
            </Col>
        </Row>
    )
}