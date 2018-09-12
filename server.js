const express = require('express');
const app = express();
const phpExpress = require('php-express')({
  binPath: 'php'
});
app.set('views', './views');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');
app.set('port', process.env.PORT || 3000);
app.all(/.+\.php$/, phpExpress.router);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.type('text/plain');
  res.send('home')
});

app.get('/bip', function(req, res){
  res.render('bip')
});

app.use(function(req, res){
  res.type('text/plain');
  res.status('404');
  res.send('404 - Не найдено');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status('500');
  res.send('500 - Ошибка сервера');
});

app.listen(app.get('port'), function() {
  console.log('Express запущен на ' + app.get('port'));
});