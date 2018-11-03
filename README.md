# 84-Charing-Cross-Road
你若恰好路过查令十字街84号，请代我献上一吻，我亏欠它良多......  
JavaScript DOM编程艺术这本书，断断续续地终于在今天看完了。84 Charing Cross Road也正是基于第12章的综合实例Jay Skript and the Domsters乐队
网站设计制作的。通过这两天84 Charing Cross Road的制作，写一些自己的所思所感。  
## 一、一个网站从一开始的构思到最后完成要经过哪些过程？
1、需求的确定，以及前期准备。网站的整体风格如何？需要展示哪些内容？网站的整体设计和排版。根据需求准备文字资料、图片等等。  
2、根据设计排版考虑站点结构。将整个网站划分成多个区域，对每个区域运用合适的元素。  
3、基本的模板确定后，为它设置样式。包括颜色（字体、背景、边框），布局(内外边距、边框、背景图片），版式（字体）。  
4、编写脚本。添加交互功能，以及可用性方面的增强。  
  
## 二、几个跟之前接触的编码习惯不同的点。
1、基础模板整体布局阶段，几乎没有用ID、类名作为选择器设置样式，都是使用元素名选择。  
2、css按颜色、样式、版式分开写，修改样式时一目了然。  
3、同时增加了一个basic.css，把color、layout、typography导入到basic中，后期如果想增加或者删除样式表，只需编辑basic.css即可。  
4、不会给某个元素设置具体的宽高。至多用个width:100%，元素的宽度和高度，靠内外边距来撑开。  
5、他们似乎更习惯于用em作为单位。比如说设置内外边距、字体大小、行高用.5em 2em这种。  
6、元素的动画效果，使用setTimeout回调，而不是用setInterval重复执行。哪一种更好呢？值得考虑......  
7、图片的宽高都是根据需要制作的，因此不需要再写css设置图片的宽高。如果还要用到某个图片的缩略图，也是制作好放在image中，而不是通过css来设置宽高。
8、整个网站下来，js代码没有一个全局变量，所有的功能都写在函数里面，再用addLoadEvent来调用函数。

## 三、疑问？
1、比如说给p元素并添加内容。书中喜欢var text = document.createTextNode("This is a piece of content.");p.appendChild(text);
为什么不直接p.innerHTML = "This is a piece of content";难道是因为这本书讲的DOM操作？

## 四、发现的两处错误
1、isFilled()中，if(!filed.value.replace(" ","").length) return false;检查去掉空格之后的value属性的length属性，以此来判断value中是否没有任何除
空格外的字符。replace(" ","")只会匹配一个，如果有多个空格，还是会校验通过，改成if(!filed.value.replace(/ /g,"").length) return false;增加全局
匹配g，即可匹配全部。  
2、validateForm（）中，if(element.required == "required")，如果这个字段必填，就对它进行检测。element.required ->true,true!="required”,导致
不会执行if判断后面的语句。改为if(element.getAttribute("required") == "required")就可以了。  
  
 ## 五、一些优点和需要学习的地方
 1、为网页添加各种行为时始终遵循“渐进增强”的原则，所以函数中出现很多  
 if(!document.createElement) return false;  
 if(!document.createTextNode) return false;  
 if(!document.getElementById) return false;  
 这样的语句。  
 2、考虑到后面可能会函数复用，还加了类似于 if(!document.getElementById("imagegallery")) return false;的判断，以及对函数充分的抽象。  
 3、prepareInternalnav函数中，sectionId作为一个局部变量，由于作用域问题，可以将局部变量赋值给自定义属性，属性的作用域是持久存在的。  
 4、把需要的内容都放在有效的、语义化的标签里，并用外部样式表实现整个外观设计，用JS和DOM添加交互功能和可用性方面的增强。即使js全部拿走，网站也能正常
 运作，很好地做到了平稳退化。  
 5、贯穿整本书的思路：平稳退化、渐进增强、以用户为中心的设计。  
 
 ## 六、遗留问题
 ajax方面的问题暂且不表，所以global.js中于ajax有关的代码是没有调试的~但不影响网站的整体功能。  
