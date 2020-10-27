<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.nickname" placeholder="Nickname" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.phone" placeholder="Phone" style="width: 200px;"  @keyup.enter.native="handleFilter"></el-input>
      <el-select v-model="listQuery.is_educator" placeholder="Is Educator" clearable style="width: 110px;" class="filter-item">
        <el-option v-for="(item,index) in percentOptions" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="listQuery.is_business" placeholder="Is Business" clearable style="width: 110px;" class="filter-item">
        <el-option v-for="(item,index) in percentOptions" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="listQuery.is_vendor" placeholder="Is Vendor" clearable style="width: 110px;" class="filter-item">
        <el-option v-for="(item,index) in percentOptions" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="listQuery.is_other" placeholder="Is Other" clearable style="width: 110px;" class="filter-item">
        <el-option v-for="(item,index) in percentOptions" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="listQuery.is_seeking" placeholder="Is Seeking" clearable style="width: 110px;" class="filter-item">
        <el-option v-for="(item,index) in seekingOptions" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="listQuery.sex" placeholder="Gender" clearable style="width: 110px;" class="filter-item">
        <el-option v-for="(item,index) in sexOptions" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
<!--      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">-->
<!--        Add-->
<!--      </el-button>-->
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
<!--      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">-->
<!--        reviewer-->
<!--      </el-checkbox>-->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="Email">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="Country">
              <span>{{ props.row.country }}</span>
            </el-form-item>
            <el-form-item label="Province">
              <span>{{ props.row.province }}</span>
            </el-form-item>
            <el-form-item label="City">
              <span>{{ props.row.city }}</span>
            </el-form-item>
<!--            <el-form-item label="Headimgurl">-->
<!--              <img :src="props.row.headimgurl" alt="headimgurl">-->
<!--&lt;!&ndash;              <span>{{ props.row.headimgurl }}</span>&ndash;&gt;-->
<!--            </el-form-item>-->
            <el-form-item label="Language">
              <span>{{ props.row.language }}</span>
            </el-form-item>
            <el-form-item label="Birthday">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-collapse accordion>
              <el-collapse-item v-if="props.row.educator">
                <template slot="title" >
                  <b style="font-size:28px;color: #99a9bf;"> Educator Info</b>
                </template>
                <div><span>First name & Last name:</span>{{props.row.educator.first_name}}{{props.row.educator.last_name}}</div>
                <div><span>Location:</span>{{props.row.educator.country}}{{props.row.educator.province}}{{props.row.educator.city}}{{props.row.educator.address}}</div>
                <div><span>Sub Identity Name:</span>{{props.row.educator.sub_identity_name}}</div>
                <div><span>Bio:</span>{{props.row.educator.bio}}</div>
                <div><span>Hobbies:</span>{{props.row.educator.hobbies}}</div>
                <div><span>Nationality:</span>{{props.row.educator.nationality}}</div>
                <div><span>Profile photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.educator.profile_photo"
                    :preview-src-list="[props.row.educator.profile_photo]">
                  </el-image>
                </div>
                <div><span>Header photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.educator.header_photo"
                    :preview-src-list="[props.row.educator.header_photo]">
                  </el-image>
                </div>
                <div><span>Video:</span>
                  <video :src="props.row.educator.video_url"></video>
                </div>

              </el-collapse-item>
              <el-collapse-item v-if="props.row.business">
                <template slot="title" >
                  <b style="font-size:28px;color: #99a9bf;"> Business Info</b>
                </template>
                <div><span>First name & Last name:</span>{{props.row.business.first_name}}{{props.row.business.last_name}}</div>
                <div><span>Location:</span>{{props.row.business.country}}{{props.row.business.province}}{{props.row.business.city}}{{props.row.business.address}}</div>
                <div><span>Sub Identity Name:</span>{{props.row.business.sub_identity_name}}</div>
                <div><span>Bio:</span>{{props.row.business.bio}}</div>
                <div><span>Business Bio:</span>{{props.row.business.business_bio}}</div>
                <div><span>Business name:</span>{{props.row.business.business_name}}</div>
                <div><span>Business phone:</span>{{props.row.business.business_phone}}</div>
                <div><span>Business type name:</span>{{props.row.business.business_type_name}}</div>
                <div><span>contact name:</span>{{props.row.business.contact_name}}</div>
                <div><span>contact phone:</span>{{props.row.business.contact_phone}}</div>
                <div><span>Curriculum:</span>{{props.row.business.curriculum}}</div>
                <div><span>Felds Trips:</span>{{props.row.business.felds_trips}}</div>
                <div><span>is_currently_hiring:</span>{{props.row.business.is_currently_hiring}}</div>
                <div><span>is_events:</span>{{props.row.business.is_events}}</div>
                <div><span>is_special_needs:</span>{{props.row.business.is_special_needs}}</div>
                <div><span>job title:</span>{{props.row.business.job_title}}</div>
                <div><span>staff student ratio:</span>{{props.row.business.staff_student_ratio}}</div>
                <div><span>teachnonlogy available:</span>{{props.row.business.technology_available}}</div>
                <div><span>website:</span>{{props.row.business.website}}</div>
                <div><span>work email:</span>{{props.row.business.work_email}}</div>
                <div><span>year founded:</span>{{props.row.business.year_founded}}</div>
                <div><span>Hobbies:</span>{{props.row.business.hobbies}}</div>
                <div><span>Nationality:</span>{{props.row.business.nationality}}</div>
                <div><span>Profile photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.business.profile_photo"
                    :preview-src-list="[props.row.business.profile_photo]">
                  </el-image>
                </div>
                <div><span>logo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.business.logo"
                    :preview-src-list="[props.row.business.logo]">
                  </el-image>
                </div>
                <div><span>Header photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.business.header_photo"
                    :preview-src-list="[props.row.business.header_photo]">
                  </el-image>
                </div>
                <div><span>Video:</span>
                  <video :src="props.row.business.video_url"></video>
                </div>
              </el-collapse-item>
              <el-collapse-item v-if="props.row.vendor">
                <template slot="title" >
                  <b style="font-size:28px;color: #99a9bf;"> Vendor Info</b>
                </template>
                <div><span>First name & Last name:</span>{{props.row.vendor.first_name}}{{props.row.vendor.last_name}}</div>
                <div><span>Location:</span>{{props.row.vendor.country}}{{props.row.vendor.province}}{{props.row.vendor.city}}{{props.row.vendor.address}}</div>
                <div><span>Business reg img:</span>{{props.row.vendor.busin_reg_img}}</div>
                <div><span>Business reg number:</span>{{props.row.vendor.busin_reg_num}}</div>
                <div><span>Vendor Bio:</span>{{props.row.vendor.vendor_bio}}</div>
                <div><span>Vendor name:</span>{{props.row.vendor.vendor_name}}</div>
                <div><span>Vendor name en:</span>{{props.row.vendor.vendor_name_en}}</div>
                <div><span>Vendor type name:</span>{{props.row.vendor.vendor_type_name}}</div>

                <div><span>is_dog_friendly:</span>{{props.row.vendor.is_dog_friendly}}</div>
                <div><span>is_events:</span>{{props.row.vendor.is_events}}</div>
                <div><span>job title:</span>{{props.row.vendor.job_title}}</div>
                <div><span>Legal company name:</span>{{props.row.vendor.legal_company_name}}</div>
                <div><span>phone:</span>{{props.row.vendor.phone}}</div>

                <div><span>website:</span>{{props.row.vendor.website}}</div>
                <div><span>work email:</span>{{props.row.vendor.work_email}}</div>
                <div><span>wechat public name:</span>{{props.row.vendor.wechat_public_name}}</div>
                <div><span>wechat public qrcode:</span>{{props.row.vendor.wechat_public_qrcode}}</div>
                <div><span>Nationality:</span>{{props.row.vendor.nationality}}</div>
                <div><span>Profile photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.vendor.profile_photo"
                    :preview-src-list="[props.row.vendor.profile_photo]">
                  </el-image>
                </div>
                <div><span>logo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.vendor.logo"
                    :preview-src-list="[props.row.vendor.logo]">
                  </el-image>
                </div>
                <div><span>Header photo:</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.vendor.header_photo"
                    :preview-src-list="[props.row.vendor.header_photo]">
                  </el-image>
                </div>
                <div><span>Video:</span>
                  <video :src="props.row.vendor.video_url"></video>
                </div>
              </el-collapse-item>

            </el-collapse>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name" width="110">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="Phone" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Is Educator"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_educator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Is Business"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_business }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Is Vendor" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_vendor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Is Other" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_other }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Is Seeking" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_seeking }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Gender" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Identity" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.identity | statusFilter">{{ scope.row.identity }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
<!--          <el-button type="primary" size="mini" @click="handleFetchDetail(row)">-->
<!--            Detail-->
<!--          </el-button>-->
<!--          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">-->
<!--            Publish-->
<!--          </el-button>-->
<!--          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">-->
<!--            Draft-->
<!--          </el-button>-->
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
<!--        <el-form-item label="Type" prop="type">-->
<!--          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">-->
<!--            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Date" prop="timestamp">-->
<!--          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />-->
<!--        </el-form-item>-->
        <el-form-item label="username" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="nickname" prop="nickname">
          <el-input v-model="temp.nickname" />
        </el-form-item>
        <el-form-item label="truename" prop="truename">
          <el-input v-model="temp.truename" />
        </el-form-item>
        <el-form-item label="sex" prop="sex">
          <el-select v-model="temp.sex" class="filter-item" placeholder="Please select gender">
            <el-option v-for="(item,index) in sexOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="phone" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="birthday" prop="birthday">
<!--          <el-input v-model="temp.birthday" />-->
          <el-date-picker
            v-model="temp.birthday"
            type="date"
            placeholder="Please picker a date"
            >
          </el-date-picker>
        </el-form-item>

<!--        <el-form-item label="Status">-->
<!--          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">-->
<!--            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Imp">-->
<!--          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Remark">-->
<!--          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogUserDetailVisible" title="User Detail">
      <el-table :data="userDetailData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="id" label="Id" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import { userList,editUserInfo } from '@/api/member'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'index',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        nickname:undefined,
        truename:undefined,
        phone:undefined,
        is_educator:undefined,
        is_business:undefined,
        is_vendor:undefined,
        is_other:undefined,
        is_seeking:undefined,
        sex:undefined
      },
      percentOptions:[0,10, 20, 30,40,50,60,70,80,90,100],
      seekingOptions:[0,1],
      sexOptions:[0,1,2],
      importanceOptions: [10, 20, 30,40,50,60,70,80,90,100],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        username:undefined,
        nickname:undefined,
        truename:undefined,
        sex:undefined,
        phone: undefined,
        email:undefined,
        birthday:''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        username: [{ required: true, message: 'username is required', trigger: 'change' }],
        birthday: [{ type: 'date', required: true, message: 'birthday is required', trigger: 'change' }],
        nickname: [{ required: true, message: 'nickname is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogUserDetailVisible:false,
      userDetailData:[],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      console.log(this.listQuery)
      userList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.message.data
        this.total = response.message.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj

      // console.log(this.temp.birthday)
      if(this.temp.birthday == '0000-00-00'){
        this.temp.birthday = new Date()
      }else{
        this.temp.birthday = new Date(this.temp.birthday)
      }
      // console.log(this.temp.birthday)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
            // console.log(this.temp)
          const tempData = Object.assign({}, this.temp)
          const tempObj = {}
          tempObj.username = this.temp.username
          tempObj.nickname = this.temp.nickname
          tempObj.truename = this.temp.truename
          tempObj.sex = this.temp.sex
          tempObj.phone = this.temp.phone
          tempObj.email = this.temp.email

          // console.log(tempData.birthday.getFullYear())
          let year = tempData.birthday.getFullYear()
          let  month = tempData.birthday.getMonth()+1
          let day = tempData.birthday.getDate()
          let birthdayStr = year+'-'+month+'-'+day
          tempObj.birthday = birthdayStr
          tempData.birthday = birthdayStr // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // console.log(tempData)
          editUserInfo(tempObj).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchDetail(detail){
      this.dialogUserDetailVisible=true
      this.userDetailData.push(detail)
      console.log(detail)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', 'name', 'phone', 'is_educator', 'is_business','is_vendor','is_other','is_seeking','identity']
        const filterVal = ['id', 'name', 'phone', 'is_educator', 'is_business','is_vendor','is_other','is_seeking','identity']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  /*width: 90px;*/
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 20%;
}
</style>
