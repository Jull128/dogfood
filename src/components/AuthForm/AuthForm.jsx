import { Input, Form, Button } from 'antd';
import { Link } from 'react-router-dom';
import style from './style.module.css'

export function AuthForm({ onFinish }) {
    return <Form
        className={style.form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}

        autoComplete="off"
    >
        <Form.Item
            label="Username"
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>


        <Form.Item className={style.field} wrapperCol={{ offset: 8, span: 16 }}>
            <Button className={style.button} type="primary" htmlType="submit" >
                Submit
            </Button>
            Or <Link to="/signup">Sign up</Link>
        </Form.Item>

    </Form>
}