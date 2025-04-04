const db=require('../db/index.js')

exports.getUser=(req,res)=>{
    const sql='select identity as name,count(*) as value from users group by identity';
    db.query(sql,(err,result)=>{
        if(err)res.cc(err);
        res.send(result)
    })

}

exports.getProduct=(req,res)=>{
    const sql='select product_category as name,sum(product_all_price) as value from product group by product_category';
    db.query(sql,(err,result)=>{
        if(err)res.cc(err);
        const price=[];
        const category=[];
        for(const obj of result){
            price.push(obj.value);
            category.push(obj.name)
        }
        res.send({
            price,
            category
        })
    })

}

exports.getMessage=(req,res)=>{
    const sql='select message_level as name,count(*) as value from message group by message_level';
    db.query(sql,(err,result)=>{
        if(err)res.cc(err);
        res.send(result)
    })

}

exports.getLogin = async (req, res) => {
    const day = new Date();
    const days = [];
    const count = new Array(7);

    // 将 select 函数改为异步函数
    const select = (date,index) => {
        return new Promise((resolve, reject) => {
            const sql = 'select * from login_log where login_time like "' + date + '%"';
            db.query(sql, (err, result) => {
                if (err) return reject(err); // 如果出错，返回错误
                count[index]=result.length;   // 将结果长度推入 count 数组
                resolve(true);             // 成功时返回 true
            });
        });
    };

    // 生成最近7天的日期
    for (let i = 1; i <= 7; i++) {
        day.setDate(day.getDate() - 1);
        let str = day.toLocaleDateString().replaceAll('/', '-').split('');
        if (str.at(-2) === '-') str.splice(-1, 0, '0');
        if (str[6] === '-') str.splice(5, 0, '0');
        days.push(str.join(''));
    }

    try {
        // 使用 Promise.all 等待所有查询完成
        await Promise.all(days.map((date,index) => select(date,index)));
        // 返回结果
        return res.send({ count, days });
    } catch (err) {
        // 如果出错，返回错误信息
        return res.send({ status: 0, message: '查询失败' });
    }
};