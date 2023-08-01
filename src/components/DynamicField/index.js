import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";
import { SelectVehicle, SelectVehicleIR, SelectVehicleSO } from "../CommonSelect/CommonSelect";
import { ProFormText } from "@ant-design/pro-form";
import { validateInt } from "@/utils/utils";

function DynamicField({IR = false, SO = false}) {
  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Form.Item
                  name={[index, "vehicleId"]}
                  label="Chọn xe"
                  rules={[{ required: true }]}
                >
                  <SelectVehicle
                    placeholder="Tìm kiếm bằng sđt chủ sở hữu..."
                    style={{
                       width: '100%',
                    }}
                    IR={IR}
                    SO={SO}
                    />
                  {/* {
                    IR && <SelectVehicleIR
                    placeholder="Tìm kiếm bằng sđt chủ sở hữu..."
                    fetchOnFirst
                    style={{
                       width: '100%',
                    }}
                    />
                  } */}
                  {/* {
                    SO && <SelectVehicleSO
                    placeholder="Tìm kiếm bằng sđt chủ sở hữu..."
                    fetchOnFirst
                    style={{
                       width: '100%',
                    }}
                    />
                  } */}
                </Form.Item>
                 <ProFormText
                     rules={[
                     {
                        required: true,
                        message: 'giá > 0',
                        validator: (_, value) => validateInt(value)
                           ? Promise.resolve()
                           : Promise.reject()
                     },
                     ]}
                     label={IR ? "Định giá":"Giá bán"}
                     name={[index, "amount"]}
                     width="md"
                  />
                {fields.length > 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Xóa xe
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
              >
                <PlusOutlined /> Thêm xe
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicField;
