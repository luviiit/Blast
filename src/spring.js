// Knife move special effects

import BaseContainer from './basecontainer';
import { Config } from './config';


export default class Spring extends BaseContainer {
  constructor(...args) {
    super(...args);
    // no of lines drawn
    this.shifts = 0;

    // save circle texture for animation
    const circleAsTexture = () => {
      let dropRenderer = new PIXI.CanvasRenderer(100, 100, {transparent: true});
      let drop = new PIXI.Graphics();
      //drop.lineStyle(4, 0xCF4710)
      drop.beginFill(0xFFA800, 1);
      drop.drawCircle(50, 50, 5*window.innerWidth/Config.ww);
      drop.endFill();
      dropRenderer.render(drop);
      return dropRenderer.view;
    }
    this.circleTexture = new PIXI.Texture.fromCanvas(circleAsTexture());
  }

  drawDrippingCircles(p1, p2) {
    const drawDrippingCircle = (p) => {
      const getCircle = (p) => {
        let circle = new PIXI.Sprite(this.circleTexture);
        circle.anchor.x = 0.5;
        circle.anchor.y = 0.5;
        circle.x = p.x;
        circle.y = p.y;
        return circle;
      };
      let circle = getCircle(p);
      this.add('circles', circle);

      // Add drips
      for (let i = 0; i < 1; i += 1) {
        let x = p.x + Math.random()*20 - 10;
        let y = p.y + Math.random()*20 - 10;
        let drip = getCircle({x, y});
        drip.scale.x = 0.6;
        drip.scale.y = 0.6;
        this.add('drips', drip);
      }
    };

    let start = (p1.x < p2.x) ? p1 : p2;
    let end = (p1.x > p2.x) ? p1 : p2;

    let m = (end.y - start.y) / (end.x - start.x);
    for (let x = start.x; x <= end.x; x += 5) {
      let y = start.y + m * (x - start.x);
      drawDrippingCircle({x, y});
    }
  }

  animateDripsVersion() {
    this.getAll('circles').forEach((circle) => {
      if (circle.alpha < 0)
        this.remove('circles', circle.name);
      circle.alpha -= 0.3;
    });

    this.getAll('drips').forEach((drip) => {
      if (drip.alpha < 0)
        this.remove('drips', drip.name);
      drip.alpha -= 0.03;
      drip.y += 5;
    });

    let data = this.parent.mouseData;

    for (let i = 1; i < data.length; i += 1) {
      this.drawDrippingCircles(data[i-1], data[i]);
      this.shifts += 1;
    }
  }

  animate() {
    this.getAll('blade').forEach((blade) => {
      if (blade.alpha < 0)
        this.remove('blade', blade.name);
      blade.alpha -= 0.3;
    });

    let data = this.parent.mouseData;
    const line = new PIXI.Graphics();
    // line.beginFill(0xFF3300);
    line.lineStyle(5, 0xffd900, 1);

    /*let points = data;
    for(var i=0,len=points.length;i<len;i++){
      var p1=points[i];var p2=points[i+1];
      if(i===0)line.moveTo(p1.x,p1.y);
      else if(p1&&p2)line.quadraticCurveTo(p1.x,p1.y,p1.x+(p2.x-p1.x)/2,p1.y+(p2.y-p1.y)/2)
      //this.shifts += 1;
    }
*/
    if (data.length === 0)
      return;

    let p1 = data[0];
    line.moveTo(p1.x, p1.y);

    for (let i = 1; i < data.length; i += 1) {
      let p1 = data[i-1];
      let p2 = data[i];
      // line.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
      line.quadraticCurveTo(p1.x,p1.y,p1.x+(p2.x-p1.x)/2,p1.y+(p2.y-p1.y)/2);
      // line.quadraticCurveTo(p1.x+(p2.x-p1.x)/2,p1.y+(p2.y-p1.y)/2, p2.x, p2.y);
    }
    this.shifts += 1;

    line.endFill();
    this.add('blade', line);
  }
}
