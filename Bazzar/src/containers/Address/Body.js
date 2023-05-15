import { Button, Descriptions, Input, Modal, Radio } from "antd";
import Card from "antd/es/card/Card";
import React from "react";
import { Form } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Address = ({ _this }) => {
  return (
    <div className="min-h-screen justify-center mt-10 lg:mt-20 p-2 lg:p-4 mx-0 sm:mx-20">
      <div className="h-max flex flex-col">
        <Card
          title="Address"
          className="w-full"
          extra={
            <Button
              onClick={() => _this.handleAddressOpenModal()}
              type="primary"
              className="
tracking-wide text-white flex items-center justify-center rounded-full bg-[#00BF62]
        hover:bg-white hover:text-[#00BF62] hover:border-[#00BF62] border-[#00BF62] hover:shadow-lg
        transition duration-500 ease-in-out h-[35px] w-full"
            >
              Add Address
            </Button>
          }
        >
          {_this.addressArray.length > 0 && (
            <div className="flex flex-col md:flex-row w-full gap-4">
              <div className="flex flex-col w-full gap-4 md:overflow-y-auto">
                {_this.addressArray.map((item) => (
                  <Card
                    className="flex flex-col gap-4"
                    actions={[
                      <EditOutlined
                        key="edit"
                        onClick={() => _this.handleOpenEditModal(item)}
                      />,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => _this.handleDeleteAddress(item)}
                      />,
                    ]}
                  >
                    <Descriptions>
                      <Descriptions.Item label="Name">
                        {item.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Address">
                        {item.address}
                      </Descriptions.Item>
                      <Descriptions.Item label="City">
                        {item.city}
                      </Descriptions.Item>
                      <Descriptions.Item label="State">
                        {item.state}
                      </Descriptions.Item>
                      <Descriptions.Item label="Pincode">
                        {item.pincode}
                      </Descriptions.Item>
                      <Descriptions.Item label="Phone">
                        {item.phone}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card>
        <AddAddress _this={_this} />
        <EditAddress _this={_this} />
      </div>
    </div>
  );
};

export default Address;

const AddAddress = ({ _this }) => (
  <Modal
    title="Add Address"
    open={_this.addressModal}
    onCancel={() => _this.handleCancelAddress()}
    centered
    footer={null}
  >
    <Form
      layout="vertical"
      name="address"
      onFinish={_this.handleAddAddress}
      form={_this.addressForm}
      autoComplete="off"
      scrollToFirstError
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input
          placeholder="Name"
          value={_this.addressFormData.name}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "name")
          }
        />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your address!",
          },
        ]}
      >
        <Input
          placeholder="Address"
          value={_this.addressFormData.address}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "address")
          }
        />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: "Please input your city!",
          },
        ]}
      >
        <Input
          placeholder="City"
          value={_this.addressFormData.city}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "city")
          }
        />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        rules={[
          {
            required: true,
            message: "Please input your state!",
          },
        ]}
      >
        <Input
          placeholder="State"
          value={_this.addressFormData.state}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "state")
          }
        />
      </Form.Item>
      <Form.Item
        label="Pincode"
        name="pincode"
        rules={[
          {
            required: true,
            message: "Please input your pincode!",
          },
        ]}
      >
        <Input
          placeholder="Pincode"
          value={_this.addressFormData.pincode}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "pincode")
          }
        />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your phone!",
          },
        ]}
      >
        <Input
          placeholder="Phone"
          value={_this.addressFormData.phone}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "phone")
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="
tracking-wide text-white flex items-center justify-center rounded-full bg-[#00BF62]
        hover:bg-white hover:text-[#00BF62] hover:border-[#00BF62] border-[#00BF62] hover:shadow-lg
        transition duration-500 ease-in-out h-[35px] w-full">
          Add Address
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);
const EditAddress = ({ _this }) => (
  <Modal
    title="Edit Address"
    open={_this.editModal}
    onCancel={() => _this.handleCancelAddress()}
    centered
    footer={null}
  >
    <Form
      layout="vertical"
      name="address"
      onFinish={_this.handleUpdateAddress}
      form={_this.addressForm}
      autoComplete="off"
      scrollToFirstError
    >
      {" "}
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input
          placeholder="Name"
          value={_this.addressFormData.name}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "name")
          }
        />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your address!",
          },
        ]}
      >
        <Input
          placeholder="Address"
          value={_this.addressFormData.address}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "address")
          }
        />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: "Please input your city!",
          },
        ]}
      >
        <Input
          placeholder="City"
          value={_this.addressFormData.city}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "city")
          }
        />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        rules={[
          {
            required: true,
            message: "Please input your state!",
          },
        ]}
      >
        <Input
          placeholder="State"
          value={_this.addressFormData.state}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "state")
          }
        />
      </Form.Item>
      <Form.Item
        label="Pincode"
        name="pincode"
        rules={[
          {
            required: true,
            message: "Please input your pincode!",
          },
        ]}
      >
        <Input
          placeholder="Pincode"
          value={_this.addressFormData.pincode}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "pincode")
          }
        />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your phone!",
          },
        ]}
      >
        <Input
          placeholder="Phone"
          value={_this.addressFormData.phone}
          onChange={(e) =>
            _this.handleAddressInputChanges(e.target.value, "phone")
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="
tracking-wide text-white flex items-center justify-center rounded-full bg-[#00BF62]
        hover:bg-white hover:text-[#00BF62] hover:border-[#00BF62] border-[#00BF62] hover:shadow-lg
        transition duration-500 ease-in-out h-[35px] w-full"
        >
          Edit Address
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);
