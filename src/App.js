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
  notification,
  FloatButton,
  Tooltip,
} from "antd";
import DragDropFileUpload from "./DragDropFileUpload";
import axios from "axios";
import env from "react-dotenv";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import exportToHtmlFile from "./exportToHtmlFile";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [html, setHtml] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    let message = "";
    let description = "";
    if (type == "success") {
      message = "Success";
      description = "Document conversion successful.";
    } else if (type == "error") {
      message = "Error";
      description = "Document conversion failed.";
    }
    api[type]({
      message: message,
      description: description,
    });
  };

  const onFileUpload = (files) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${env.BACKEND_URL}/upload`, formData)
      .then((res) => {
        openNotificationWithIcon("success");
        setHtml(res.data);
      })
      .catch((err) => {
        openNotificationWithIcon("error");
        console.error(err);
      });
  };

  const resetPage = () => {
    setHtml("");
  };

  return (
    <>
      {contextHolder}
      <Layout style={{ height: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Flex align={"middle"} id="header">
            <Text strong style={{ color: "white", fontSize: 22 }}>
              Docx to HTML
            </Text>
          </Flex>
          <Flex align={"middle"} id="reset">
            <Tooltip placement="left" title={"Reset page"}>
              <RedoOutlined
                style={{ color: "white", fontSize: "large" }}
                onClick={() => resetPage()}
              />
            </Tooltip>
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

        {html != "" ? (
          <FloatButton
            icon={<DownloadOutlined />}
            type="primary"
            style={{ right: 55, bottom: 90 }}
            onClick={() => exportToHtmlFile(html)}
            tooltip={<div>Download</div>}
          />
        ) : (
          ""
        )}
      </Layout>
    </>
  );
};
export default App;
