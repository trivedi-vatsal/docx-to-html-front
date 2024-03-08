import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Typography,
  Flex,
  Card,
  Col,
  Row,
} from "antd";
import DragDropFileUpload from "./DragDropFileUpload";
import axios from "axios";
import env from "react-dotenv";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [html, setHtml] = useState("");

  const onFileUpload = (files) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${env.BACKEND_URL}/upload`, formData)
      .then((res) => {
        setHtml(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Flex align={"middle"}>
          <Text strong style={{ color: "white", fontSize: 22 }}>
            Docx to HTML
          </Text>
        </Flex>
      </Header>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          // background: colorBgContainer,
          // borderRadius: borderRadiusLG,
        }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Card align="center">
              <DragDropFileUpload onFileUpload={onFileUpload} />
            </Card>
          </Col>
          <Col span={24} style={{ marginTop: 16 }}>
            <Card
              style={{
                marginTop: 16,
                minHeight: 550,
                maxHeight: 550,
                overflowY: "auto",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        docx-to-html ©{new Date().getFullYear()} Created by Solguruz
      </Footer>
    </Layout>
  );
};
export default App;
