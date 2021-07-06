var programCode = function(processingInstance) {
      with (processingInstance) {
        size(canvas.width,canvas.height);
        //variables
        var bgm=new Audio('ghostly-music.mp3');
        var bgmM;
        window.onclick=function(){bgmM=true};
        var mute=false;
        var canva=document.getElementById("mycanvas");
        
        width=canvas.width;
        height=canvas.height;

        var pass=false;
        var v3=false;
        var v4=(3*width/4)-120*width/100;
        var v5=false;
        var v6p1=false;
        var v6=false;
        var v7p1=false;
        var v7=false;
        var v8p1=false;
        var v8=false;
        var v9p1=false;
        var v9=false;
        var v10p1=false;
        var v10=false;
        var fade=0;
        var fade2=0;
        var fade3=0;
        var fade4=0;
        var fade5=0;
        var fade6=0;
        var fade7=0;
        var fade8=0;
        var fade9=0;
        var fade10=0;
        var time=0;
        var scene=-1; //-1
        var bbutton1=200;
        var bbutton2=200;
        var bbutton3=200;
        var bbutton4=200;

        //center rects on (x,y)
        var rectangle=function(x,y,width,height,r){
          rect(x-width/2,y-height/2,width,height,r);
        };

        //flashlight
        var flashlight=function(x,y,size){
          noStroke();
          for(var a=0;a<255;a++){
            //fill(255, 255, 0, 2);
            fill(a, a, 0);
            triangle(x+0.9*size,y+size/5,x+1.1*size+size*5-a*((5*size)/255),y-(255-a)*((5*0.5*size)/255),x+1.1*size+size*5-a*((5*size)/255),y+2*size/5+(255-a)*((5*0.5*size)/255));
          }
          fill(225,225,225);
          //outer part
          triangle(x, y+size/5, x+1.2*size, y-0.75*size/5, x+1.2*size, y+(2*size/5)+(0.75*size/5));
          //long part
          rect(x,y,size,2*size/5,2*size/5);
        }

        var keys=function(x,y,size){
          noStroke();
          textAlign(CENTER,CENTER);
          textSize(size);
          text("🔑",x,y);
        }

        //buttons
        var button1=function(x,y,width,height,r,txt){
          stroke(bbutton1);
          strokeWeight(window.innerWidth/400);
          fill(100);
          rectangle(x,y,width,height,r);
          textSize(8*height/10);
          fill(bbutton1);
          text(txt,x,y);
          noStroke();

          
          if(mouseX > x-width/2 && mouseX < x+width/2 && mouseY > y-height/2 && mouseY < y+height/2){
            cursor(HAND);
            if(bbutton1<254){
              bbutton1+=2;
            }
          }
          else{
            cursor(ARROW);
            if(bbutton1>200){
              bbutton1-=2;
            }
          }
        };

        var button2=function(x,y,width,height,r,txt){
          stroke(bbutton2);
          strokeWeight(window.innerWidth/400);
          fill(100);
          rectangle(x,y,width,height,r);
          textSize(8*height/10);
          fill(bbutton2);
          text(txt,x,y);
          noStroke();

          
          if(mouseX > x-width/2 && mouseX < x+width/2 && mouseY > y-height/2 && mouseY < y+height/2){
            cursor(HAND);
            if(bbutton2<254){
              bbutton2+=2;
            }
          }
          else{
            if(bbutton2>200){
              bbutton2-=2;
            }
          }
        };

        var button3=function(x,y,width,height,r,txt){
          stroke(bbutton3);
          strokeWeight(window.innerWidth/400);
          fill(100);
          rectangle(x,y,width,height,r);
          textSize(8*height/10);
          fill(bbutton3);
          text(txt,x,y);
          noStroke();

          
          if(mouseX > x-width/2 && mouseX < x+width/2 && mouseY > y-height/2 && mouseY < y+height/2){
            cursor(HAND);
            if(bbutton3<254){
              bbutton3+=2;
            }
          }
          else{
            if(bbutton3>200){
              bbutton3-=2;
            }
          }
        };

        var button4=function(x,y,width,height,r,txt){
          stroke(bbutton4);
          strokeWeight(window.innerWidth/400);
          fill(100);
          rectangle(x,y,width,height,r);
          textSize(8*height/10);
          fill(bbutton4);
          text(txt,x,y);
          noStroke();

          
          if(mouseX > x-width/2 && mouseX < x+width/2 && mouseY > y-height/2 && mouseY < y+height/2){
            cursor(HAND);
            if(bbutton4<254){
              bbutton4+=2;
            }
          }
          else{
            if(bbutton4>200){
              bbutton4-=2;
            }
          }
        };

        var room=function(){
          noStroke();
          textAlign(CENTER, CENTER);
          background(200, 150, 80);
          fill(180, 130, 60);
          rect(0,3.5*height/5,width,1.5*height/5);
          fill(190,140,70);
          rect(2.2*width/5,3.5*height/5-width/5,0.6*width/5,1*width/5,width/100,width/100,0,0);
          fill(170, 120, 50);
          ellipse((2.7*width/5),(3.5*height/5-width/5)+width/10,0.1*width/5,0.1*width/5);
          fill(220,0,0);
          rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
          textSize(0.15*width/5);
          text("🔒",2.5*width/5,3.5*height/5-width/5-0.15*width/5);

          fill(255);
          textAlign(RIGHT,TOP);
          textSize(0.15*width/5);
          textFont(createFont("Comic Sans MS"));
          text("LEVEL: " + scene, width-width/111, 0);
          //textFont(createFont("Arial"));
          textAlign(CENTER, CENTER);
        }

        draw=function(){
          textAlign(CENTER, CENTER);
          noStroke();

          if(bgmM===true && mute===false){
              bgm.play();
          }


          if(scene===-1){
            cursor(ARROW);
            background(0,0,0);
            fill(255,255,255);
            textSize(width/15);
            text("𝗘𝘀𝗰𝗮𝗽𝗲 𝗥𝗼𝗼𝗺",width/2,2*height/10);
            textSize(width/50);
            text("h a c k a t h o n   e d i t i o n",width/2,2*height/10+width/15);
            button1(width/2,2*height/4,width/5,height/10,width/75,"ђ๏ฬ");
            button2(width/2,2.6*height/4,width/5,height/10,width/75,"קɭคץ");
            button3(width/2,3.2*height/4,width/5,height/10,width/75,"₥υȶє");

            pushMatrix();
            translate(width/20,2.6*height/4-(width/20)/5);
            //rotate(-0.523599);
            flashlight(0,0,width/20);
            popMatrix();

            pushMatrix();
            translate(width/100+width/2+width/10+(width-(width/2+width/10))/2,-height/120+2*height/3);
            rotate(-1.0472);
            keys(0,0,width/8);
            popMatrix();
            pushMatrix();
            translate(-width/115+width/2+width/10+(width-(width/2+width/10))/2,2*height/3);
            rotate(-0.698132);
            keys(0,0,width/7);
            popMatrix();

            /*stroke(205);
            strokeWeight((width/7)/20);
            noFill();
            ellipse(width/2+width/10+(width-(width/2+width/10))/2,-height/150+2*height/3-(width/7)/2,(width/7)/7.5,(width/7)/3);
            stroke(232, 149, 54);*/ // KEY HOLDER CIRCLE

            pushMatrix();
            translate(-width/38+width/2+width/10+(width-(width/2+width/10))/2,-height/150+2*height/3);
            rotate(-0.349066149599794);
            keys(0,0,width/7);
            popMatrix();

            //line((width/7)/15+width/2+width/10+(width-(width/2+width/10))/2,-height/150+2*height/3-(width/7)/2,(width/7)/15+width/2+width/10+(width-(width/2+width/10))/2,-height/100+2*height/3-(width/7)/2);
      //      noStroke();
            //fill(232, 149, 54);
            //fill(235, 147, 53);
      //      fill(205);
      //      pushMatrix();
            //translate(-(width/7)/7+(width/7)/15+width/2+width/10+(width-(width/2+width/10))/2,-height/40+2*height/3-(width/7)/2);
      //      translate(width/2+width/10+(width-(width/2+width/10))/2,-height/120+2*height/3-(width/7)/2,(width/7)/7.5,(width/7)/3);
            //rotate(radians(20));
      //      rectangle(-(width/7)/17.5,0,(width/7)/20,(width/7)/5.6);
      //      popMatrix();

          }

          else if(scene===0){
            cursor(ARROW);
            background(0,0,0);
            fill(255,255,255);
            textSize(width/15);
            text("𝗛𝗢𝗪",width/2,2*height/10);

            textSize(height/20);
            text("Engage in this suspenseful Escape Room! Will\nyou be able to escape? Find out by playing!\n By identifying patterns in the room,\nyou will move on to the next level! The black\ntext gives you a puzzle you will\nneed to solve sometimes!",width/2,5.36*height/10); //about 40 characters per line, to make new line: \n

            button4(width/2,3.5*height/4,width/5,height/10,width/75,"ђ๏ɱє");
          }

          else if(scene===1){
            cursor(ARROW);
            room();
            fill(225);
            textSize(0.2*width/5);
            text("Find and click\non the hidden\nkey to complete\nthe level!",0.9*width/4,4.3*height/5-width/5-0.2*width/5);
            textSize(width/30);
            text("🔑",width-width/30,3.5*height/5);

            //level maneuver
            if(pass===true){
              fill(0,215,0);
              rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
              textSize(0.15*width/5);
              text("🔓",2.5*width/5,3.5*height/5-width/5-0.15*width/5);
              time++;
              if(time>1.5*60){
                if(fade<255){
                  fade+=2;
                }
              }
              if(fade>=255){
                time=0;
                afterFade=true;
                scene++;
                pass=false;
              }
            } 
          }

          else if(scene===2){
            cursor(ARROW);
            if(fade>0){
              fade-=2;
            }
            room();
            fill(225);
            textSize(0.2*width/5);
            text("",0.9*width/4,4.3*height/5-width/5-0.2*width/5);

            textSize(0.12*width/5);
            text("🔑",width/4-width/20,3.5*height/5);

            //level maneuver
            if(pass===true){
              fill(0,215,0);
              rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
              textSize(0.15*width/5);
              text("🔓",2.5*width/5,3.5*height/5-width/5-0.15*width/5);
              if(fade2<255){
                fade2+=2;
              }
              if(fade2>=255){
                scene++;
                pass=false;
              }
            }
          }

          else if(scene===3){
            cursor(ARROW);
            if(fade2>0){
              fade2-=2;
            }
            room();
            fill(225);
            textSize(0.2*width/5);
            text("The key can\nbe invisible!\nSolve the puzzle\nto see the key!",0.9*width/4,4.3*height/5-width/5-0.2*width/5);
            fill(25);
            text("Press 'd'",width/2,4.2*height/5);

            if(keyPressed && keyCode===68){
              textSize(0.15*width/5);
              text("🔑",(3*width/4),(3.5*height/5-width/5)+width/10);
              v3=true;
            }
            if(keyPressed && v3===true){
              textSize(0.15*width/5);
              text("🔑",(3*width/4),(3.5*height/5-width/5)+width/10);
            }

            //level maneuver
            if(pass===true){
              fill(0,215,0);
              rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
              textSize(0.15*width/5);
              text("🔓",2.5*width/5,3.5*height/5-width/5-0.15*width/5);
              if(fade3<255){
                fade3+=2;
              }
              if(fade3>=255){
                time=0;
                scene++;
                pass=false;
              }
            }
          }

          else if(scene===4){
            cursor(ARROW);
            if(fade3>0){
              fade3-=2;
            }
            room();
            fill(225);
            textSize(0.2*width/5);
            text("",0.9*width/4,4.3*height/5-width/5-0.2*width/5);
            fill(25);
            text("Hold the 'right' key\nto see the key!",width/2,4.2*height/5);

            if(keyPressed && keyCode===RIGHT){
              textSize(0.15*width/5);
              text("🔑",v4,(3.5*height/5-width/4));
              if(v4<(3*width/4)){
                v4+=width/100;
              }
            }
            if(keyPressed && v4>=3*width/4){
              textSize(0.15*width/5);
              text("🔑",v4,(3.5*height/5-width/4));
            }

            //level maneuver
            if(pass===true){
              fill(0,215,0);
              rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
              textSize(0.15*width/5);
              text("🔓",2.5*width/5,3.5*height/5-width/5-0.15*width/5);
              if(fade4<255){
                fade4+=2;
              }
              if(fade4>=255){
                time=0;
                scene++;
                pass=false;
              }
            }
          }

          else if(scene===5){
            cursor(ARROW);
            if(fade4>0){
              fade4-=2;
            }
            room();
            fill(225);
            textSize(0.17*width/5);
            text("This is a bit\ntricky... Can you\ndecode the black\ntext? (there's a\nclue in it!)",0.9*width/4,4.3*height/5-width/5-0.2*width/5+0.0015*width/5);
            fill(25);
            text("oPinion: aRe thESe Simpl3",width/2,4.2*height/5);

            if(keyPressed && keyCode===51){
              textSize(0.15*width/5);
              text("🔑",width/25,(4.5*height/5));
              v5=true;
            }
            if(keyPressed && v5===true){
              textSize(0.15*width/5);
              text("🔑",width/25,(4.5*height/5));
            }

            //level maneuver
            if(pass===true){
              fill(0,215,0);
              rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
              textSize(0.15*width/5);
              text("🔓",2.5*width/5,3.5*height/5-width/5-0.15*width/5);
              if(fade5<255){
                fade5+=2;
              }
              if(fade5>=255){
                time=0;
                scene++;
                pass=false;
              }
            }
          }

          else if(scene===6){
            cursor(ARROW);
            if(fade5>0){
              fade5-=2;
            }
            room();
            fill(225);
            textSize(0.25*width/5);
            text("Can you get\nthis one?",0.9*width/4,4.3*height/5-width/5-0.2*width/5+0.0015*width/5);
            fill(25);
            text("Uzqf uif ovncfs gpsuz-tfwfo",width/2,4.2*height/5);

            if(keyPressed && keyCode===52){
              v6p1=true;
            }
            if(keyPressed && keyCode===55 && v6p1===true){
              textSize(0.175*width/5);
              text("🔑",width/3,3.5*height/5-width/4);
              v6=true;
            }
            if(keyPressed && v6===true){
              textSize(0.175*width/5);
              text("🔑",width/3,3.5*height/5-width/4);
            }

            //level maneuver
            if(pass===true){
              fill(0,215,0);
              rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
              textSize(0.15*width/5);
              text("🔓",2.5*width/5,3.5*height/5-width/5-0.15*width/5);
              if(fade6<255){
                fade6+=2;
              }
              if(fade6>=255){
                time=0;
                scene++;
                pass=false;
              }
            }
          }

          else if(scene===7){
            cursor(ARROW);
            if(fade6>0){
              fade6-=2;
            }
            room();
            fill(225);
            textSize(0.25*width/5);
            text("This one is\nupside-down...",0.9*width/4,4.3*height/5-width/5-0.2*width/5+0.0015*width/5);
            fill(25);
            text("ɟod-znoɟxn sɟɔuʌo ɟᴉn ɟbzn",width/2,4.2*height/5);

            if(keyPressed && keyCode===50){
              v7p1=true;
            }
            if(keyPressed && keyCode===49 && v7p1===true){
              textSize(0.175*width/5);
              text("🔑",width/2,(3.8*height/5));
              v7=true;
            }
            if(keyPressed && v7===true){
              textSize(0.175*width/5);
              text("🔑",width/2,(3.8*height/5));
            }

            //level maneuver
            if(pass===true){
              fill(0,215,0);
              rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
              textSize(0.15*width/5);
              text("🔓",2.5*width/5,3.5*height/5-width/5-0.15*width/5);
              if(fade7<255){
                fade7+=2;
              }
              if(fade7>=255){
                time=0;
                scene++;
                pass=false;
              }
            }
          }

          else if(scene===8){
            cursor(ARROW);
            if(fade7>0){
              fade7-=2;
            }
            room();
            fill(225);
            textSize(0.25*width/5);
            text("Hard, right?",0.9*width/4,4.3*height/5-width/5-0.2*width/5+0.0015*width/5);
            fill(25);
            text("eerht-ythgie ni epyt",width/2,4.2*height/5);

            if(keyPressed && keyCode===56){
              v8p1=true;
            }
            if(keyPressed && keyCode===51 && v8p1===true){
              textAlign(RIGHT,TOP);
              textSize(0.3*width/5);
              text("🔑",width-width/111,width/25);
              v8=true;
            }
            if(keyPressed && v8===true){
              textAlign(RIGHT,TOP);
              textSize(0.3*width/5);
              text("🔑",width-width/111,width/25);
            }
            textAlign(CENTER, CENTER);

            //level maneuver
            if(pass===true){
              fill(0,215,0);
              rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
              textSize(0.15*width/5);
              text("🔓",2.5*width/5,3.5*height/5-width/5-0.15*width/5);
              if(fade8<255){
                fade8+=2;
              }
              if(fade8>=255){
                time=0;
                scene++;
                pass=false;
              }
            }
          }

          else if(scene===9){
            cursor(ARROW);
            if(fade8>0){
              fade8-=2;
            }
            room();
            fill(225);
            textSize(0.2*width/5);
            text("Think about the\nprevious puzzles...",0.9*width/4,4.3*height/5-width/5-0.2*width/5+0.0015*width/5);
            textSize(0.075*width/5);
            //text("(Upside-down text, backwards text)",0.9*width/4,4.3*height/5-0.825*width/5+0.0015*width/5);
            fill(25);
            textSize(0.25*width/5);
            text("ʇʎdǝ ɟᴉɟʇʎ-ʇʍo",width/2,4.2*height/5);

            if(keyPressed && keyCode===53){
              v9p1=true;
            }
            if(keyPressed && keyCode===50 && v9p1===true){
              textSize(0.175*width/5);
              text("🔑",width/22.5,4.1*height/5-width/5-0.2*width/5+0.0015*width/5);
              v9=true;
            }
            if(keyPressed && v9===true){
              textSize(0.175*width/5);
              text("🔑",width/22.5,4.1*height/5-width/5-0.2*width/5+0.0015*width/5);
            }

            //level maneuver
            if(pass===true){
              fill(0,215,0);
              rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
              textSize(0.15*width/5);
              text("🔓",2.5*width/5,3.5*height/5-width/5-0.15*width/5);
              if(fade9<255){
                fade9+=2;
              }
              if(fade9>=255){
                time=0;
                scene++;
                pass=false;
              }
            }
          }

          else if(scene===10){
            this.x=0.8;
            cursor(ARROW);
            if(fade9>0){
              fade9-=2;
            }
            room();
            fill(225);
            textSize(0.2*width/5);
            text("Congrats!\nThis is the last\nlevel! But it's\nreally hard...",0.9*width/4,4.3*height/5-width/5-0.2*width/5+0.0015*width/5);
            textSize(0.1*width/5);
            fill(100);
            text("Solve the puzzle below and type in that number to reveal the key:",width/2,3.7*height/5);
            textSize(0.25*width/5);
            textAlign(LEFT,CENTER);
            fill(50);
            text("s   a  u  v  g  k",(this.x-0.02)*width/4,4.2*height/5);
            text("n  e          o",(this.x+1.36)*width/4,4.2*height/5);
            text("b  y",(this.x+1.79)*width/4,4.2*height/5);           
            fill(200);
            text("  x  e  r  d  e  j  p  t  q  m",this.x*width/4,4.2*height/5);
            textAlign(CENTER,CENTER);

            if(keyPressed && keyCode===55){
              v10p1=true;
            }
            if(keyPressed && keyCode===48 && v10p1===true){
              textSize(0.175*width/5);
              text("🔑",2.5*width/5,3.5*height/5-width/5-0.4*width/5);
              v10=true;
            }
            if(keyPressed && v10===true){
              textSize(0.175*width/5);
              text("🔑",2.5*width/5,3.5*height/5-width/5-0.4*width/5);
            }

            //level maneuver
            if(pass===true){
              fill(0,215,0);
              rectangle(2.5*width/5,3.5*height/5-width/5-0.15*width/5+1,0.2*width/5,0.2*width/5,width/80);
              textSize(0.15*width/5);
              text("🔓",2.5*width/5,3.5*height/5-width/5-0.15*width/5);
              if(fade10<255){
                fade10+=2;
              }
              if(fade10>=255){
                time=0;
                scene++;
                pass=false;
              }
            }
          }

          else if(scene===11){
            cursor(ARROW);
            if(fade10>0){
              fade10-=2;
            }
            background(0,0,0);
            fill(255,255,255);
            //textSize(width/50);
            //textFont(createFont("Arial"));
            //text("__________\n '._==_=_==_.' \n .-\\:     ‍    ‍ ‍ ‍ ‍‍ ‍  /-. \n| (|:.‍ ‍ ‍ ‍ ‍ ‍ ‍ ‍      |) |\n '-|:.‍ ‍  ‍ ‍ ‍ ‍ ‍      |-' \n   \\::.‍  ‍ ‍ ‍ ‍ ‍     /   \n    '::.  ‍ ‍ ‍ ‍ ‍  .'    \n      )   ‍  ‍ (      \n    _.'   ‍  ‍ '._    \n   `\"\"\"\"\"\"\"\"\"\"`   ",width/2,height/2);
            textSize(width/4);
            text("🏆",width/2,height/2);
            textSize(width/20);
            text("CONGRATULATIONS!",width/2,height/10);
            text("You successfully escaped!",width/2,9*height/10);
          }






/**
          if(win === true){
            document.getElementById("pyLink").style.display = "block";
          }
          else if(win===false){
            document.getElementById("pyLink").style.display = "none";
          }
**/

          fill(0,0,0,fade);
          rect(0,0,width,height);
          fill(0,0,0,fade2);
          rect(0,0,width,height);
          fill(0,0,0,fade3);
          rect(0,0,width,height);
          fill(0,0,0,fade4);
          rect(0,0,width,height);
          fill(0,0,0,fade5);
          rect(0,0,width,height);
          fill(0,0,0,fade6);
          rect(0,0,width,height);
          fill(0,0,0,fade7);
          rect(0,0,width,height);
          fill(0,0,0,fade8);
          rect(0,0,width,height);
          fill(0,0,0,fade9);
          rect(0,0,width,height);
          fill(0,0,0,fade10);
          rect(0,0,width,height);


          mouseClicked=function(){
            //how
            if(mouseX>width/2-width/10 && mouseX<width/2+width/10 && mouseY>height/2-height/20 && mouseY<height/2+height/20 && scene===-1){ 
              scene++;
            }
            //play
            else if(mouseX>width/2-width/10 && mouseX<width/2+width/10 && mouseY>2.6*height/4-height/20 && mouseY<2.6*height/4+height/20 && scene===-1){
              if(bgmM===false){
                bgmM=true;
              }
              scene=1;
            }
            //mute
            else if(mouseX>width/2-width/10 && mouseX<width/2+width/10 && mouseY>3.2*height/4-height/20 && mouseY<3.2*height/4+height/20 && scene===-1){
              bgm.volume=0;
            }
            //home
            else if(mouseX>width/2-width/10 && mouseX<width/2+width/10 && mouseY>3.5*height/4-height/20 && mouseY<3.5*height/4+height/20 && (scene===0)){
              scene=-1;
            }

            //pass lvl 1
            else if(mouseX>width-width/30-width/60 && mouseX<width+width/60 && mouseY>3.5*height/5-width/60 && mouseY<3.5*height/5+width/60 && scene===1){
              pass=true;
            }

            //pass lvl 2
            else if(mouseX>width/4-width/20-0.06*width/5 && mouseX< width/4-width/20+0.06*width/5 && mouseY>3.5*height/5-0.06*width/5 && mouseY<3.5*height/5+0.06*width/5 && scene===2){
              pass=true;
            }
            
            //pass lvl 3
            else if(mouseX>3*width/4-0.075*width/5 && mouseX<3*width/4+0.075*width/5 && mouseY>3.5*height/5-width/5+width/10-0.075*width/5 && mouseY<3.5*height/5-width/5+width/10+0.075*width/5 && scene===3 && v3===true){
              pass=true;
            }

            //pass lvl 4
            else if(mouseX>3*width/4-0.075*width/5 &&  mouseX<3*width/4+0.075*width/5 && mouseY>(3.5*height/5-width/4)-0.075*width/5 && mouseY<(3.5*height/5-width/4)+0.075*width/5 && scene===4 && v4>=(3*width/4)){
              pass=true;
            }

            //pass lvl 5
            else if(mouseX>width/25-0.15*width/10 && mouseX<width/25+0.15*width/10 && mouseY>4.5*height/5-0.15*width/10 && mouseY<4.5*height/5+0.15*width/10 && scene===5 && v5===true){
              pass=true;
            }

            //pass lvl 6
            else if(mouseX>width/3-0.175*width/10 && mouseX<width/3+0.175*width/10 && mouseY>3.5*height/5-width/4-0.175*width/10 && mouseY<3.5*height/5-width/4+0.175*width/10 && scene===6 && v6===true){
              pass=true;
            }

            //pass lvl 7
            else if(mouseX>width/2-0.175*width/10 && mouseX<width/2+0.175*width/10 && mouseY>3.8*height/5-0.175*width/10 && mouseY<3.8*height/5+0.175*width/10 && scene===7 && v7===true){
              pass=true;
            }

            //pass lvl 8
            else if(mouseX>width-width/111-0.3*width/5 && mouseX<width-width/111 && mouseY>width/25 && mouseY<width/25+0.3*width/5 && scene===8 && v8===true){
              pass=true;
            }

            //pass lvl 9
            else if(mouseX>width/22.5-0.175*width/10 && mouseX<width/22.5+0.175*width/10 && mouseY>4.1*height/5-width/5-0.2*width/5+0.0015*width/5-0.175*width/10 && mouseY<4.1*height/5-width/5-0.2*width/5+0.0015*width/5+0.175*width/10 && scene===9 && v9===true){
              pass=true;
            }

            //pass lvl 10
            else if(mouseX>2.5*width/5-0.175*width/10 && mouseX<2.5*width/5+0.175*width/10 && mouseY>3.5*height/5-width/5-0.4*width/5-0.175*width/10 && mouseY<3.5*height/5-width/5-0.4*width/5+0.175*width/10 && scene===10 && v10===true){
              pass=true;
            }

          };
        };

        
        
      }
      }
  var processingInstance = new Processing(canvas, programCode);