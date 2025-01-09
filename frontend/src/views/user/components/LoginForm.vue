<script>
import { reqLoginAPI, reqRegisterAPI } from '@/api/api'
export default {
  name: 'Login',
  props: ['type'],
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      btnLoading: false
    }
  },
  mounted() {

  },
  methods: {
    login(values) {
      this.btnLoading = true
      if (this.type === 'login') {
        reqLoginAPI(values).then((res) => {
          if (!res.userId) return
          localStorage.setItem('userId', res.userId)
          localStorage.setItem('username', values.username)
          this.$message.success('Login successful');
          this.$router.push('/')
        }).finally(() => {
          this.btnLoading = false
        })
      } else {
        reqRegisterAPI(values).then(() => {
          this.$router.push('/login')
          this.$message.success('Register successful');
        }).finally(() => {
          this.btnLoading = false
        })
      }
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.login(values)
        }
      })
    }
  }
}
</script>


<template>
  <div style="padding-left: 100px">
    <a-row>
      <a-col :span="12">
        <div class="bgimg"></div>
      </a-col>
      <a-col :span="12" class="loginRIght">
        <div class="login_header">
          <img src="@/assets/images/logo.png" alt="">
          <span>{{ type === 'login' ? 'Finance With Me' : 'Sign Up' }}</span>
        </div>
        <div class="login_form">
          <a-form @submit="handleSubmit" :form=form>
            <a-form-item>
              <span>Username</span>
              <a-input
                v-decorator="['username', { rules: [{ required: true, message: 'Please enter your account number!' }] }]"
                placeholder="username"></a-input>
            </a-form-item>
            <a-form-item>
              <span>Password</span>
              <a-input
                v-decorator="['password', { rules: [{ required: true, message: 'Please enter your password!' }] }]"
                type="password" placeholder="password"></a-input>
            </a-form-item>
            <a-button size="large" @click="handleSubmit" :loading="btnLoading">{{ type === 'login' ? 'Login' :
              'Sign Up' }}</a-button>
          </a-form>
        </div>
        <div class="login_footer" v-if="type === 'login'">
          <div style="width: 100%;display: flex;">
            <span class=link-left></span>
            <span>Don't have an account?</span>
            <span class="link-right"></span>
          </div>
          <a-button size="large" @click="$router.push('/register')">Sign
            Up</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
body {
  span {
    color: #0981d6;
    font-weight: 400;

  }

  .bgimg {
    height: 100vh;
    background: url('@/assets/images/login-bg.png') no-repeat;
    background-size: contain;
  }

  .loginRIght {
    padding-top: 70px;
    padding-bottom: 70px;

    >div {
      margin: auto;
      width: 60%;

    }

    .login_form {
      span {
        font-size: 20px;
      }

      .ant-form-item {
        margin-top: 70px;

        .ant-input {
          margin-top: 30px;
          outline: none;
          height: 50px;
          border: none;
          border-bottom: 1px solid #ccc;
        }
      }

      .ant-btn {
        margin: 30px 50%;
        padding-left: 25px;
        padding-right: 25px;
        outline: none;
        border: none;
        font-size: 20px;
        color: #fff;
        background-color: #54bcbd;
        border-radius: 10px;
        transform: translateX(-50%);
        box-shadow: 1px 1px 5px #2a2727
      }
    }

    .login_header {
      img {
        width: 80px;
        height: 80px;
        object-fit: contain;
      }

      span {
        margin-left: 40px;
        font-size: 50px;
        vertical-align: middle;
      }
    }

    .login_footer {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      align-items: center;
      height: 120px;

      .link-left {
        flex: 1;
        height: 1px;
        border-top: solid #ACC0D8 1px;
        transform: translateY(10px);
      }

      .link-right {
        flex: 1;
        height: 1px;
        border-top: solid #ACC0D8 1px;
        transform: translateY(10px);

      }

      button {
        color: #54bcbd;
        border-radius: 5px;
        box-shadow: 0 0 5px #ccc;
        font-size: 20px;
      }

    }
  }
}
</style>