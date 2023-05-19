/****************************************  数据请求 开始  **************************************************/

  // 获取主表格数据 - 展示数据库所有的数据表
  async function getTables() {
    return new Promise((resolve) => {
      fetch('/api/tables')
        .then((res) => {
          //   console.log(res)
          return res.text()
        })
        .then((data) => {
          //   console.log(JSON.parse(data))
          resolve(JSON.parse(data))
        })
    })
  }

  // 新增数据表 - 往数据库新增一张数据表
  async function addDatatable(data = {}) {
    return new Promise((resolve) => {
      fetch('/api/add/table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((res) => {
          //   console.log(res)
          return res.text()
        })
        .then((data) => {
          //   console.log(JSON.parse(data))
          resolve(JSON.parse(data))
        })
    })
  }

/****************************************  数据请求 结束  **************************************************/

/****************************************  ViewModel 开始  **************************************************/

  function MyViewModel() {
    var self = this

    // 主表格
    self.tableNames = ko.observableArray([])

    // 模态框标题
    self.modalTitle = ko.observable('')

    self.showModal = ko.observable(false)
    self.model = new bootstrap.Modal(document.getElementById('myModal'))

    /****************************************  新增数据表 开始  **************************************************/
  
    // 新增数据表 - 表单
    self.addForm = ko.mapping.fromJS({
      // TODO table_name 视图会不会自动更新
      table_name: '', // 表名
      // TODO fields_list 视图会不会自动更新
      fields_list: [
        {
          fields_name: '',
          fields_type: 'VARCHAR(255) NOT NULL' // TODO 默认值, 枚举值
        }
      ]
    })

    // 新增数据表 - 添加字段
    self.addField = function () {
      self.addForm.fields_list.push({
        fields_name: ko.observable(''), // 此处如果直接使用 '', 新增之后数据会变更，但视图不更新。
        fields_type: ko.observable('VARCHAR(255) NOT NULL') // 此处如果直接使用 '', 新增之后数据会变更，但视图不更新。
      })
    }
  
    // 新增数据表 - 保存
    self.saveForm = function () {
      // 在这里处理保存表单的逻辑
      const form = ko.toJS(self.addForm)
      const names = self.tableNames().map((e) => e.name)

      if (names.includes(form.table_name)) {
        alert('数据表重名!')
        return
      }

      addDatatable(form)
    }
  
    /****************************************  新增数据表 结束  **************************************************/

    self.addPerson = function () {
      self.modalTitle('添加人员')

      self.showModal(true);
      self.model.show()
    }

    self.editPerson = function (person) {
      self.modalTitle('编辑人员')
      
      self.showModal(true);
      self.model.show()
    }

    self.removePerson = function (person) {
      // self.tableNames.remove(person);
    }

    // todo delete
    self.savePerson = function() {}
  }

  // 实例化MyViewModel
  var pageVM = new MyViewModel()
  ko.applyBindings(pageVM)

/****************************************  ViewModel 结束  **************************************************/


// 新增数据表模态框弹窗里 - 填充数据事件，写在外部有意而为测试
function fillAddform() {
  // 假设你已经获取到新的 addForm 数据对象
  var newAddForm = {
    table_name: 'persons2',
    fields_list: [
      { fields_name: 'name1', fields_type: 'VARCHAR(255) NOT NULL' },
      { fields_name: 'name2', fields_type: 'VARCHAR(255) NOT NULL' }
    ]
  }

  // 使用 Knockout Mapping 插件的 fromJS 方法将新的数据赋值给 pageVM.addForm
  ko.mapping.fromJS(newAddForm, {}, pageVM.addForm)
}

// 初始化数据表 - 表格
async function initTables() {
  const { data } = await getTables()

  // 通知Knockout.js即将修改可观察数组
  pageVM.tableNames.valueWillMutate()
  // 清空tableNames可观察数组
  pageVM.tableNames([])

  // 将新数据添加到tableNames可观察数组中
  pageVM.tableNames.push(...data)

  // 通知Knockout.js已完成对可观察数组的修改
  pageVM.tableNames.valueHasMutated()
}

async function initApp() {
  initTables()
  console.log(pageVM.addForm)
}

window.onload = initApp()

// console.log(ko.version)
