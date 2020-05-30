import React, { useState } from 'react';
import {Table, Input, InputNumber, Popconfirm, Form} from 'antd'
import AddButton from './components/AddButton'

interface Food {
  key: string;
  name: string;
  description: string;
}

const originData: Food[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    description: `London Park no. ${i}`,
  });
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Food; 
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                     editing,
                                                     dataIndex,
                                                     title,
                                                     inputType,
                                                     record,
                                                     index,
                                                     children,
                                                     ...restProps
                                                   }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Food = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const [isAdding, setIsAdding] = useState(false) 
  const isEditing = (record: Food) => record.key === editingKey;

  const edit = (record: Food) => {
    form.setFieldsValue({ name: '', description: '', ...record });
    setEditingKey(record.key);
  };

  const doDelete = (record: Food) => {
    setData(
      data.filter(({key}) => key !== record.key)
    )
  }

  const cancel = () => {
    setEditingKey('');
  };

  function addRow() {
    if(!isAdding) {
      const key = data.length.toString()
      setEditingKey(key)
      form.setFieldsValue({name: '', description: ''})
      setData([{key, name: '', description: ''}, ...data])
      setIsAdding(true)
    }
    
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Food;

      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
      setIsAdding(false)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
      inputType: 'text',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      editable: true,
      inputType: 'text',
    },
    {
      title: () => <div>
        Operation 
        <AddButton 
        onClick={addRow}
        style={{float: 'right',}}
        />
      </div>,
      dataIndex: 'operation',
      render: (_: any, record: Food) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a href="#save" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a href="#cancel">Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
          <a href="#edit" onClick={() => edit(record)} style={{marginRight: 8,}}>
            Edit
          </a>
          <Popconfirm title="Sure to delete?" onConfirm={() => doDelete(record)}> 
          <a href="#delete" style={{color: 'red', }}>
            Delete
          </a>
            </Popconfirm>
          </>
          
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Food) => ({
        record,
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default Food
