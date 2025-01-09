import {
  Button, Layout, Menu, Icon, Result, Select,
  Row, Col, Form, Input, Breadcrumb, message, Table,
  Card, Drawer, Tooltip, Modal, Progress, Popconfirm, Empty
} from 'ant-design-vue'

import TabBtn from '@/components/tabBtn/index.vue'

export default {
  install(app) {
    app.use(Button)
    app.use(Table)
    app.use(Row)
    app.use(Col)
    app.use(Form)
    app.use(Input)
    app.use(Layout)
    app.use(Menu)
    app.use(Icon)
    app.use(Result)
    app.use(Breadcrumb)
    app.use(Card)
    app.use(Tooltip)
    app.use(Progress)
    app.use(Modal)
    app.use(Popconfirm)
    app.use(Drawer)
    app.use(Select)
    app.use(Empty)
    app.prototype.$message = message;
    app.prototype.$confirm = Modal.confirm;
    app.component('TabBtn', TabBtn)
  }
}
