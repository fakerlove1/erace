import Vue from 'vue'
import { Button, Card, Carousel, CarouselItem, Dialog, Link, Pagination, Popconfirm, Popover } from 'element-ui'
import { Input, Avatar } from "element-ui"
import { Row, Col } from "element-ui"
import { Form, FormItem, Message } from "element-ui"
import { Dropdown, DropdownItem, DropdownMenu } from "element-ui"
import { Tabs, TabPane, Divider, Upload } from "element-ui"
import { Checkbox, Image, Radio, RadioGroup, Select, Option } from "element-ui"
import { Menu, MenuItem, MenuItemGroup, Submenu } from "element-ui"
import { DatePicker, InputNumber, Table, TableColumn } from "element-ui"
import { Breadcrumb, BreadcrumbItem, Cascader } from "element-ui"
import { MessageBox } from "element-ui"

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Avatar)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Card)

Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)

Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Divider)

Vue.use(Checkbox)
Vue.use(Image)

Vue.use(RadioGroup)
Vue.use(Radio)

Vue.use(Select)
Vue.use(Option)

Vue.use(Popover)
Vue.use(Popconfirm)

Vue.use(Upload)

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)

Vue.use(DatePicker)
Vue.use(InputNumber)

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Cascader);
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.use(Link);

Vue.prototype.$message = Message
Vue.prototype.$messagebox = MessageBox