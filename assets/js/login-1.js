$(function() {
    // 点击去注册账号链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // layui获取form 对象
    var form = layui.form
    // 通过form.verify()函数自定义规则
    form.verify({
        //pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        pwd: [/^[\S]{6,12}/,'密码6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参获取确认密码框内容
            // 获取密码框内容
            // 进行一次等于的判断
            // 判断石板，则return 一个提示消息
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认的提交行为
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
          }
        // 发起ajax 的POST 请求
        $.post('api/reguser', data, function(res) {
            if (res.status !==0) {
                return console.log(res.message)
            }
            layer.msg('注册成功,请登录');
            console.log('注册成功')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: 'api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                // 将成功登录得到token字符串保存到localStroge
                localStorage.setItem('token', res.token)
                console.log(res.token)
                // 跳转到后台主页
                //location.href = '/index.html'
            }
        })
    })
})

