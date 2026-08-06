var xl=1,Qh=2,Vt=3,ni=0,lt=1,eu=2,Ds=2,Mi=100,Wn=204,Xn=205,yl=0,tu=1,iu=2,jt=0,ru=1,au=2,nu=3,su=4,ou=5,lu=6,Sl=300,lr=301,hr=302,qn=303,jn=304,ja=306,Yn=1e3,Wt=1001,Zn=1002,st=1003,Is=1004,xr=1005,dt=1006,sn=1007,Qi=1008,Ti=1009,hs=1012,Ml=1013,ri=1014,Xt=1015,Ir=1016,El=1017,Tl=1018,bi=1020,Lt=1023,wi=1026,ur=1027,bl=1029,wl=1031,Al=1033,on=33776,ln=33777,hn=33778,un=33779,Os=35840,Fs=35841,zs=35842,Bs=35843,Rl=36196,Hs=37492,Gs=37496,Vs=37808,ks=37809,Ws=37810,Xs=37811,qs=37812,js=37813,Ys=37814,Zs=37815,Ks=37816,Js=37817,$s=37818,Qs=37819,eo=37820,to=37821,cn=36492,io=36494,ro=36495,ao=36284,no=36285,so=36286,Da=2300,Ia=2301,dn=2302,oo=2400,lo=2401,ho=2402,Cl=3e3,Ai=3001,Nt="",je="srgb",Zt="srgb-linear",us="display-p3",Ya="display-p3-linear",Oa="linear",ze="srgb",Fa="rec709",za="p3",Ui=7680,uo=35044,co="300 es",Kn=1035,cr=2e3,Ba=2001,pr=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let a=i.indexOf(e);a!==-1&&i.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let e=this._listeners[t.type];if(e!==void 0){t.target=this;let i=e.slice(0);for(let a=0,r=i.length;a<r;a++)i[a].call(this,t);t.target=null}}},it=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],po=1234567,rr=Math.PI/180,Or=180/Math.PI;function Li(){let t=4294967295*Math.random()|0,e=4294967295*Math.random()|0,i=4294967295*Math.random()|0,a=4294967295*Math.random()|0;return(it[255&t]+it[t>>8&255]+it[t>>16&255]+it[t>>24&255]+"-"+it[255&e]+it[e>>8&255]+"-"+it[e>>16&15|64]+it[e>>24&255]+"-"+it[63&i|128]+it[i>>8&255]+"-"+it[i>>16&255]+it[i>>24&255]+it[255&a]+it[a>>8&255]+it[a>>16&255]+it[a>>24&255]).toLowerCase()}function Qe(t,e,i){return Math.max(e,Math.min(i,t))}function Jn(t,e){return(t%e+e)%e}function Cr(t,e,i){return(1-i)*t+i*e}function $n(t){return(t&t-1)==0&&t!==0}function Ha(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function Ki(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function at(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(4294967295*t);case Uint16Array:return Math.round(65535*t);case Uint8Array:return Math.round(255*t);case Int32Array:return Math.round(2147483647*t);case Int16Array:return Math.round(32767*t);case Int8Array:return Math.round(127*t);default:throw new Error("Invalid component type.")}}var hu={DEG2RAD:rr,RAD2DEG:Or,generateUUID:Li,clamp:Qe,euclideanModulo:Jn,mapLinear:function(t,e,i,a,r){return a+(t-e)*(r-a)/(i-e)},inverseLerp:function(t,e,i){return t!==e?(i-t)/(e-t):0},lerp:Cr,damp:function(t,e,i,a){return Cr(t,e,1-Math.exp(-i*a))},pingpong:function(t,e=1){return e-Math.abs(Jn(t,2*e)-e)},smoothstep:function(t,e,i){return t<=e?0:t>=i?1:(t=(t-e)/(i-e))*t*(3-2*t)},smootherstep:function(t,e,i){return t<=e?0:t>=i?1:(t=(t-e)/(i-e))*t*t*(t*(6*t-15)+10)},randInt:function(t,e){return t+Math.floor(Math.random()*(e-t+1))},randFloat:function(t,e){return t+Math.random()*(e-t)},randFloatSpread:function(t){return t*(.5-Math.random())},seededRandom:function(t){t!==void 0&&(po=t);let e=po+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(t){return t*rr},radToDeg:function(t){return t*Or},isPowerOfTwo:$n,ceilPowerOfTwo:function(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},floorPowerOfTwo:Ha,setQuaternionFromProperEuler:function(t,e,i,a,r){let n=Math.cos,s=Math.sin,o=n(i/2),l=s(i/2),h=n((e+a)/2),u=s((e+a)/2),d=n((e-a)/2),c=s((e-a)/2),p=n((a-e)/2),m=s((a-e)/2);switch(r){case"XYX":t.set(o*u,l*d,l*c,o*h);break;case"YZY":t.set(l*c,o*u,l*d,o*h);break;case"ZXZ":t.set(l*d,l*c,o*u,o*h);break;case"XZX":t.set(o*u,l*m,l*p,o*h);break;case"YXY":t.set(l*p,o*u,l*m,o*h);break;case"ZYZ":t.set(l*m,l*p,o*u,o*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}},normalize:at,denormalize:Ki},se=class Pl{constructor(e=0,i=0){Pl.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let i=this.x,a=this.y,r=e.elements;return this.x=r[0]*i+r[3]*a+r[6],this.y=r[1]*i+r[4]*a+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Math.max(e.x,Math.min(i.x,this.x)),this.y=Math.max(e.y,Math.min(i.y,this.y)),this}clampScalar(e,i){return this.x=Math.max(e,Math.min(i,this.x)),this.y=Math.max(e,Math.min(i,this.y)),this}clampLength(e,i){let a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(i,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;let a=this.dot(e)/i;return Math.acos(Qe(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let i=this.x-e.x,a=this.y-e.y;return i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,a){return this.x=e.x+(i.x-e.x)*a,this.y=e.y+(i.y-e.y)*a,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){let a=Math.cos(i),r=Math.sin(i),n=this.x-e.x,s=this.y-e.y;return this.x=n*a-s*r+e.x,this.y=n*r+s*a+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ce=class Ll{constructor(e,i,a,r,n,s,o,l,h){Ll.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,a,r,n,s,o,l,h)}set(e,i,a,r,n,s,o,l,h){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=i,u[4]=n,u[5]=l,u[6]=a,u[7]=s,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let i=this.elements,a=e.elements;return i[0]=a[0],i[1]=a[1],i[2]=a[2],i[3]=a[3],i[4]=a[4],i[5]=a[5],i[6]=a[6],i[7]=a[7],i[8]=a[8],this}extractBasis(e,i,a){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){let a=e.elements,r=i.elements,n=this.elements,s=a[0],o=a[3],l=a[6],h=a[1],u=a[4],d=a[7],c=a[2],p=a[5],m=a[8],_=r[0],v=r[3],f=r[6],g=r[1],x=r[4],y=r[7],C=r[2],T=r[5],A=r[8];return n[0]=s*_+o*g+l*C,n[3]=s*v+o*x+l*T,n[6]=s*f+o*y+l*A,n[1]=h*_+u*g+d*C,n[4]=h*v+u*x+d*T,n[7]=h*f+u*y+d*A,n[2]=c*_+p*g+m*C,n[5]=c*v+p*x+m*T,n[8]=c*f+p*y+m*A,this}multiplyScalar(e){let i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){let e=this.elements,i=e[0],a=e[1],r=e[2],n=e[3],s=e[4],o=e[5],l=e[6],h=e[7],u=e[8];return i*s*u-i*o*h-a*n*u+a*o*l+r*n*h-r*s*l}invert(){let e=this.elements,i=e[0],a=e[1],r=e[2],n=e[3],s=e[4],o=e[5],l=e[6],h=e[7],u=e[8],d=u*s-o*h,c=o*l-u*n,p=h*n-s*l,m=i*d+a*c+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=d*_,e[1]=(r*h-u*a)*_,e[2]=(o*a-r*s)*_,e[3]=c*_,e[4]=(u*i-r*l)*_,e[5]=(r*n-o*i)*_,e[6]=p*_,e[7]=(a*l-h*i)*_,e[8]=(s*i-a*n)*_,this}transpose(){let e,i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,a,r,n,s,o){let l=Math.cos(n),h=Math.sin(n);return this.set(a*l,a*h,-a*(l*s+h*o)+s+e,-r*h,r*l,-r*(-h*s+l*o)+o+i,0,0,1),this}scale(e,i){return this.premultiply(pn.makeScale(e,i)),this}rotate(e){return this.premultiply(pn.makeRotation(-e)),this}translate(e,i){return this.premultiply(pn.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){let i=Math.cos(e),a=Math.sin(e);return this.set(i,-a,0,a,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){let i=this.elements,a=e.elements;for(let r=0;r<9;r++)if(i[r]!==a[r])return!1;return!0}fromArray(e,i=0){for(let a=0;a<9;a++)this.elements[a]=e[a+i];return this}toArray(e=[],i=0){let a=this.elements;return e[i]=a[0],e[i+1]=a[1],e[i+2]=a[2],e[i+3]=a[3],e[i+4]=a[4],e[i+5]=a[5],e[i+6]=a[6],e[i+7]=a[7],e[i+8]=a[8],e}clone(){return new this.constructor().fromArray(this.elements)}},pn=new Ce;function Nl(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ga(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function uu(){let t=Ga("canvas");return t.style.display="block",t}var fo={};function ar(t){t in fo||(fo[t]=!0,console.warn(t))}var mo=new Ce().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),go=new Ce().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),qr={[Zt]:{transfer:Oa,primaries:Fa,toReference:t=>t,fromReference:t=>t},[je]:{transfer:ze,primaries:Fa,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Ya]:{transfer:Oa,primaries:za,toReference:t=>t.applyMatrix3(go),fromReference:t=>t.applyMatrix3(mo)},[us]:{transfer:ze,primaries:za,toReference:t=>t.convertSRGBToLinear().applyMatrix3(go),fromReference:t=>t.applyMatrix3(mo).convertLinearToSRGB()}},cu=new Set([Zt,Ya]),Oe={enabled:!0,_workingColorSpace:Zt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!cu.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,i){if(this.enabled===!1||e===i||!e||!i)return t;let a=qr[e].toReference;return(0,qr[i].fromReference)(a(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return qr[t].primaries},getTransfer:function(t){return t===Nt?Oa:qr[t].transfer}};function nr(t){return t<.04045?.0773993808*t:Math.pow(.9478672986*t+.0521327014,2.4)}function fn(t){return t<.0031308?12.92*t:1.055*Math.pow(t,.41666)-.055}var Di,Ul=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Di===void 0&&(Di=Ga("canvas")),Di.width=t.width,Di.height=t.height;let i=Di.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Di}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ga("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let a=i.getImageData(0,0,t.width,t.height),r=a.data;for(let n=0;n<r.length;n++)r[n]=255*nr(r[n]/255);return i.putImageData(a,0,0),e}if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(255*nr(e[i]/255)):e[i]=nr(e[i]);return{data:e,width:t.width,height:t.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},du=0,Dl=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=Li(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let n=0,s=a.length;n<s;n++)a[n].isDataTexture?r.push(mn(a[n].image)):r.push(mn(a[n]))}else r=mn(a);i.url=r}return e||(t.images[this.uuid]=i),i}};function mn(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?Ul.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var pu=0,_t=class wa extends pr{constructor(e=wa.DEFAULT_IMAGE,i=wa.DEFAULT_MAPPING,a=1001,r=1001,n=1006,s=1008,o=1023,l=1009,h=wa.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=Li(),this.name="",this.source=new Dl(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=a,this.wrapT=r,this.magFilter=n,this.minFilter=s,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(ar("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Ai?je:Nt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let a={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),i||(e.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yn:e.x=e.x-Math.floor(e.x);break;case Wt:e.x=e.x<0?0:1;break;case Zn:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Yn:e.y=e.y-Math.floor(e.y);break;case Wt:e.y=e.y<0?0:1;break;case Zn:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ar("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===je?Ai:Cl}set encoding(e){ar("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ai?je:Nt}};_t.DEFAULT_IMAGE=null,_t.DEFAULT_MAPPING=Sl,_t.DEFAULT_ANISOTROPY=1;var et=class Il{constructor(e=0,i=0,a=0,r=1){Il.prototype.isVector4=!0,this.x=e,this.y=i,this.z=a,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,a,r){return this.x=e,this.y=i,this.z=a,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let i=this.x,a=this.y,r=this.z,n=this.w,s=e.elements;return this.x=s[0]*i+s[4]*a+s[8]*r+s[12]*n,this.y=s[1]*i+s[5]*a+s[9]*r+s[13]*n,this.z=s[2]*i+s[6]*a+s[10]*r+s[14]*n,this.w=s[3]*i+s[7]*a+s[11]*r+s[15]*n,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,a,r,n,s=e.elements,o=s[0],l=s[4],h=s[8],u=s[1],d=s[5],c=s[9],p=s[2],m=s[6],_=s[10];if(Math.abs(l-u)<.01&&Math.abs(h-p)<.01&&Math.abs(c-m)<.01){if(Math.abs(l+u)<.1&&Math.abs(h+p)<.1&&Math.abs(c+m)<.1&&Math.abs(o+d+_-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;let f=(o+1)/2,g=(d+1)/2,x=(_+1)/2,y=(l+u)/4,C=(h+p)/4,T=(c+m)/4;return f>g&&f>x?f<.01?(a=0,r=.707106781,n=.707106781):(a=Math.sqrt(f),r=y/a,n=C/a):g>x?g<.01?(a=.707106781,r=0,n=.707106781):(r=Math.sqrt(g),a=y/r,n=T/r):x<.01?(a=.707106781,r=.707106781,n=0):(n=Math.sqrt(x),a=C/n,r=T/n),this.set(a,r,n,i),this}let v=Math.sqrt((m-c)*(m-c)+(h-p)*(h-p)+(u-l)*(u-l));return Math.abs(v)<.001&&(v=1),this.x=(m-c)/v,this.y=(h-p)/v,this.z=(u-l)/v,this.w=Math.acos((o+d+_-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Math.max(e.x,Math.min(i.x,this.x)),this.y=Math.max(e.y,Math.min(i.y,this.y)),this.z=Math.max(e.z,Math.min(i.z,this.z)),this.w=Math.max(e.w,Math.min(i.w,this.w)),this}clampScalar(e,i){return this.x=Math.max(e,Math.min(i,this.x)),this.y=Math.max(e,Math.min(i,this.y)),this.z=Math.max(e,Math.min(i,this.z)),this.w=Math.max(e,Math.min(i,this.w)),this}clampLength(e,i){let a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(i,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,a){return this.x=e.x+(i.x-e.x)*a,this.y=e.y+(i.y-e.y)*a,this.z=e.z+(i.z-e.z)*a,this.w=e.w+(i.w-e.w)*a,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},fu=class extends pr{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new et(0,0,t,e),this.scissorTest=!1,this.viewport=new et(0,0,t,e);let a={width:t,height:e,depth:1};i.encoding!==void 0&&(ar("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Ai?je:Nt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new _t(a,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){this.width===t&&this.height===e&&this.depth===i||(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Dl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ci=class extends fu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Ol=class extends _t{constructor(t=null,e=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:a},this.magFilter=st,this.minFilter=st,this.wrapR=Wt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},mu=class extends _t{constructor(t=null,e=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:a},this.magFilter=st,this.minFilter=st,this.wrapR=Wt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},hi=class{constructor(t=0,e=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=a}static slerpFlat(t,e,i,a,r,n,s){let o=i[a+0],l=i[a+1],h=i[a+2],u=i[a+3],d=r[n+0],c=r[n+1],p=r[n+2],m=r[n+3];if(s===0)return t[e+0]=o,t[e+1]=l,t[e+2]=h,void(t[e+3]=u);if(s===1)return t[e+0]=d,t[e+1]=c,t[e+2]=p,void(t[e+3]=m);if(u!==m||o!==d||l!==c||h!==p){let _=1-s,v=o*d+l*c+h*p+u*m,f=v>=0?1:-1,g=1-v*v;if(g>Number.EPSILON){let y=Math.sqrt(g),C=Math.atan2(y,v*f);_=Math.sin(_*C)/y,s=Math.sin(s*C)/y}let x=s*f;if(o=o*_+d*x,l=l*_+c*x,h=h*_+p*x,u=u*_+m*x,_===1-s){let y=1/Math.sqrt(o*o+l*l+h*h+u*u);o*=y,l*=y,h*=y,u*=y}}t[e]=o,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,a,r,n){let s=i[a],o=i[a+1],l=i[a+2],h=i[a+3],u=r[n],d=r[n+1],c=r[n+2],p=r[n+3];return t[e]=s*p+h*u+o*c-l*d,t[e+1]=o*p+h*d+l*u-s*c,t[e+2]=l*p+h*c+s*d-o*u,t[e+3]=h*p-s*u-o*d-l*c,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,a){return this._x=t,this._y=e,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,a=t._y,r=t._z,n=t._order,s=Math.cos,o=Math.sin,l=s(i/2),h=s(a/2),u=s(r/2),d=o(i/2),c=o(a/2),p=o(r/2);switch(n){case"XYZ":this._x=d*h*u+l*c*p,this._y=l*c*u-d*h*p,this._z=l*h*p+d*c*u,this._w=l*h*u-d*c*p;break;case"YXZ":this._x=d*h*u+l*c*p,this._y=l*c*u-d*h*p,this._z=l*h*p-d*c*u,this._w=l*h*u+d*c*p;break;case"ZXY":this._x=d*h*u-l*c*p,this._y=l*c*u+d*h*p,this._z=l*h*p+d*c*u,this._w=l*h*u-d*c*p;break;case"ZYX":this._x=d*h*u-l*c*p,this._y=l*c*u+d*h*p,this._z=l*h*p-d*c*u,this._w=l*h*u+d*c*p;break;case"YZX":this._x=d*h*u+l*c*p,this._y=l*c*u+d*h*p,this._z=l*h*p-d*c*u,this._w=l*h*u-d*c*p;break;case"XZY":this._x=d*h*u-l*c*p,this._y=l*c*u-d*h*p,this._z=l*h*p+d*c*u,this._w=l*h*u+d*c*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+n)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],a=e[4],r=e[8],n=e[1],s=e[5],o=e[9],l=e[2],h=e[6],u=e[10],d=i+s+u;if(d>0){let c=.5/Math.sqrt(d+1);this._w=.25/c,this._x=(h-o)*c,this._y=(r-l)*c,this._z=(n-a)*c}else if(i>s&&i>u){let c=2*Math.sqrt(1+i-s-u);this._w=(h-o)/c,this._x=.25*c,this._y=(a+n)/c,this._z=(r+l)/c}else if(s>u){let c=2*Math.sqrt(1+s-i-u);this._w=(r-l)/c,this._x=(a+n)/c,this._y=.25*c,this._z=(o+h)/c}else{let c=2*Math.sqrt(1+u-i-s);this._w=(n-a)/c,this._x=(r+l)/c,this._y=(o+h)/c,this._z=.25*c}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qe(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let a=Math.min(1,e/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,a=t._y,r=t._z,n=t._w,s=e._x,o=e._y,l=e._z,h=e._w;return this._x=i*h+n*s+a*l-r*o,this._y=a*h+n*o+r*s-i*l,this._z=r*h+n*l+i*o-a*s,this._w=n*h-i*s-a*o-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,a=this._y,r=this._z,n=this._w,s=n*t._w+i*t._x+a*t._y+r*t._z;if(s<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,s=-s):this.copy(t),s>=1)return this._w=n,this._x=i,this._y=a,this._z=r,this;let o=1-s*s;if(o<=Number.EPSILON){let c=1-e;return this._w=c*n+e*this._w,this._x=c*i+e*this._x,this._y=c*a+e*this._y,this._z=c*r+e*this._z,this.normalize(),this}let l=Math.sqrt(o),h=Math.atan2(l,s),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=n*u+this._w*d,this._x=i*u+this._x*d,this._y=a*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),a=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(a),i*Math.sin(r),i*Math.cos(r),e*Math.sin(a))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class Fl{constructor(e=0,i=0,a=0){Fl.prototype.isVector3=!0,this.x=e,this.y=i,this.z=a}set(e,i,a){return a===void 0&&(a=this.z),this.x=e,this.y=i,this.z=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(_o.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(_o.setFromAxisAngle(e,i))}applyMatrix3(e){let i=this.x,a=this.y,r=this.z,n=e.elements;return this.x=n[0]*i+n[3]*a+n[6]*r,this.y=n[1]*i+n[4]*a+n[7]*r,this.z=n[2]*i+n[5]*a+n[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let i=this.x,a=this.y,r=this.z,n=e.elements,s=1/(n[3]*i+n[7]*a+n[11]*r+n[15]);return this.x=(n[0]*i+n[4]*a+n[8]*r+n[12])*s,this.y=(n[1]*i+n[5]*a+n[9]*r+n[13])*s,this.z=(n[2]*i+n[6]*a+n[10]*r+n[14])*s,this}applyQuaternion(e){let i=this.x,a=this.y,r=this.z,n=e.x,s=e.y,o=e.z,l=e.w,h=2*(s*r-o*a),u=2*(o*i-n*r),d=2*(n*a-s*i);return this.x=i+l*h+s*d-o*u,this.y=a+l*u+o*h-n*d,this.z=r+l*d+n*u-s*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let i=this.x,a=this.y,r=this.z,n=e.elements;return this.x=n[0]*i+n[4]*a+n[8]*r,this.y=n[1]*i+n[5]*a+n[9]*r,this.z=n[2]*i+n[6]*a+n[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Math.max(e.x,Math.min(i.x,this.x)),this.y=Math.max(e.y,Math.min(i.y,this.y)),this.z=Math.max(e.z,Math.min(i.z,this.z)),this}clampScalar(e,i){return this.x=Math.max(e,Math.min(i,this.x)),this.y=Math.max(e,Math.min(i,this.y)),this.z=Math.max(e,Math.min(i,this.z)),this}clampLength(e,i){let a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(i,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,a){return this.x=e.x+(i.x-e.x)*a,this.y=e.y+(i.y-e.y)*a,this.z=e.z+(i.z-e.z)*a,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){let a=e.x,r=e.y,n=e.z,s=i.x,o=i.y,l=i.z;return this.x=r*l-n*o,this.y=n*s-a*l,this.z=a*o-r*s,this}projectOnVector(e){let i=e.lengthSq();if(i===0)return this.set(0,0,0);let a=e.dot(this)/i;return this.copy(e).multiplyScalar(a)}projectOnPlane(e){return gn.copy(this).projectOnVector(e),this.sub(gn)}reflect(e){return this.sub(gn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;let a=this.dot(e)/i;return Math.acos(Qe(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let i=this.x-e.x,a=this.y-e.y,r=this.z-e.z;return i*i+a*a+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,a){let r=Math.sin(i)*e;return this.x=r*Math.sin(a),this.y=Math.cos(i)*e,this.z=r*Math.cos(a),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,a){return this.x=e*Math.sin(i),this.y=a,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){let i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){let i=this.setFromMatrixColumn(e,0).length(),a=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=a,this.z=r,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,4*i)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,3*i)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=2*(Math.random()-.5),i=Math.random()*Math.PI*2,a=Math.sqrt(1-e**2);return this.x=a*Math.cos(i),this.y=a*Math.sin(i),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},gn=new w,_o=new hi,ui=class{constructor(t=new w(1/0,1/0,1/0),e=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Mt.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Mt.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Mt.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let n=0,s=r.count;n<s;n++)t.isMesh===!0?t.getVertexPosition(n,Mt):Mt.fromBufferAttribute(r,n),Mt.applyMatrix4(t.matrixWorld),this.expandByPoint(Mt);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),jr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),jr.copy(i.boundingBox)),jr.applyMatrix4(t.matrixWorld),this.union(jr)}let a=t.children;for(let r=0,n=a.length;r<n;r++)this.expandByObject(a[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Mt),Mt.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(yr),Yr.subVectors(this.max,yr),Ii.subVectors(t.a,yr),Oi.subVectors(t.b,yr),Fi.subVectors(t.c,yr),Jt.subVectors(Oi,Ii),$t.subVectors(Fi,Oi),gi.subVectors(Ii,Fi);let e=[0,-Jt.z,Jt.y,0,-$t.z,$t.y,0,-gi.z,gi.y,Jt.z,0,-Jt.x,$t.z,0,-$t.x,gi.z,0,-gi.x,-Jt.y,Jt.x,0,-$t.y,$t.x,0,-gi.y,gi.x,0];return!!_n(e,Ii,Oi,Fi,Yr)&&(e=[1,0,0,0,1,0,0,0,1],!!_n(e,Ii,Oi,Fi,Yr)&&(Zr.crossVectors(Jt,$t),e=[Zr.x,Zr.y,Zr.z],_n(e,Ii,Oi,Fi,Yr)))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Mt).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=.5*this.getSize(Mt).length()),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()||(Ft[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ft[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ft[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ft[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ft[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ft[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ft[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ft[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ft)),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ft=[new w,new w,new w,new w,new w,new w,new w,new w],Mt=new w,jr=new ui,Ii=new w,Oi=new w,Fi=new w,Jt=new w,$t=new w,gi=new w,yr=new w,Yr=new w,Zr=new w,_i=new w;function _n(t,e,i,a,r){for(let n=0,s=t.length-3;n<=s;n+=3){_i.fromArray(t,n);let o=r.x*Math.abs(_i.x)+r.y*Math.abs(_i.y)+r.z*Math.abs(_i.z),l=e.dot(_i),h=i.dot(_i),u=a.dot(_i);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>o)return!1}return!0}var gu=new ui,Sr=new w,vn=new w,ci=class{constructor(t=new w,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):gu.setFromPoints(t).getCenter(i);let a=0;for(let r=0,n=t.length;r<n;r++)a=Math.max(a,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Sr.subVectors(t,this.center);let e=Sr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),a=.5*(i-this.radius);this.center.addScaledVector(Sr,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(vn.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Sr.copy(t.center).add(vn)),this.expandByPoint(Sr.copy(t.center).sub(vn))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},zt=new w,xn=new w,Kr=new w,Qt=new w,yn=new w,Jr=new w,Sn=new w,Za=class{constructor(t=new w,e=new w(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,zt)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=zt.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zt.copy(this.origin).addScaledVector(this.direction,e),zt.distanceToSquared(t))}distanceSqToSegment(t,e,i,a){xn.copy(t).add(e).multiplyScalar(.5),Kr.copy(e).sub(t).normalize(),Qt.copy(this.origin).sub(xn);let r=.5*t.distanceTo(e),n=-this.direction.dot(Kr),s=Qt.dot(this.direction),o=-Qt.dot(Kr),l=Qt.lengthSq(),h=Math.abs(1-n*n),u,d,c,p;if(h>0)if(u=n*o-s,d=n*s-o,p=r*h,u>=0)if(d>=-p)if(d<=p){let m=1/h;u*=m,d*=m,c=u*(u+n*d+2*s)+d*(n*u+d+2*o)+l}else d=r,u=Math.max(0,-(n*d+s)),c=-u*u+d*(d+2*o)+l;else d=-r,u=Math.max(0,-(n*d+s)),c=-u*u+d*(d+2*o)+l;else d<=-p?(u=Math.max(0,-(-n*r+s)),d=u>0?-r:Math.min(Math.max(-r,-o),r),c=-u*u+d*(d+2*o)+l):d<=p?(u=0,d=Math.min(Math.max(-r,-o),r),c=d*(d+2*o)+l):(u=Math.max(0,-(n*r+s)),d=u>0?r:Math.min(Math.max(-r,-o),r),c=-u*u+d*(d+2*o)+l);else d=n>0?-r:r,u=Math.max(0,-(n*d+s)),c=-u*u+d*(d+2*o)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),a&&a.copy(xn).addScaledVector(Kr,d),c}intersectSphere(t,e){zt.subVectors(t.center,this.origin);let i=zt.dot(this.direction),a=zt.dot(zt)-i*i,r=t.radius*t.radius;if(a>r)return null;let n=Math.sqrt(r-a),s=i-n,o=i+n;return o<0?null:s<0?this.at(o,e):this.at(s,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0?!0:t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,a,r,n,s,o,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,a=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,a=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,n=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,n=(t.min.y-d.y)*h),i>n||r>a?null:((r>i||isNaN(i))&&(i=r),(n<a||isNaN(a))&&(a=n),u>=0?(s=(t.min.z-d.z)*u,o=(t.max.z-d.z)*u):(s=(t.max.z-d.z)*u,o=(t.min.z-d.z)*u),i>o||s>a?null:((s>i||i!=i)&&(i=s),(o<a||a!=a)&&(a=o),a<0?null:this.at(i>=0?i:a,e)))}intersectsBox(t){return this.intersectBox(t,zt)!==null}intersectTriangle(t,e,i,a,r){yn.subVectors(e,t),Jr.subVectors(i,t),Sn.crossVectors(yn,Jr);let n,s=this.direction.dot(Sn);if(s>0){if(a)return null;n=1}else{if(!(s<0))return null;n=-1,s=-s}Qt.subVectors(this.origin,t);let o=n*this.direction.dot(Jr.crossVectors(Qt,Jr));if(o<0)return null;let l=n*this.direction.dot(yn.cross(Qt));if(l<0||o+l>s)return null;let h=-n*Qt.dot(Sn);return h<0?null:this.at(h/s,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Pe=class Qn{constructor(e,i,a,r,n,s,o,l,h,u,d,c,p,m,_,v){Qn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,a,r,n,s,o,l,h,u,d,c,p,m,_,v)}set(e,i,a,r,n,s,o,l,h,u,d,c,p,m,_,v){let f=this.elements;return f[0]=e,f[4]=i,f[8]=a,f[12]=r,f[1]=n,f[5]=s,f[9]=o,f[13]=l,f[2]=h,f[6]=u,f[10]=d,f[14]=c,f[3]=p,f[7]=m,f[11]=_,f[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qn().fromArray(this.elements)}copy(e){let i=this.elements,a=e.elements;return i[0]=a[0],i[1]=a[1],i[2]=a[2],i[3]=a[3],i[4]=a[4],i[5]=a[5],i[6]=a[6],i[7]=a[7],i[8]=a[8],i[9]=a[9],i[10]=a[10],i[11]=a[11],i[12]=a[12],i[13]=a[13],i[14]=a[14],i[15]=a[15],this}copyPosition(e){let i=this.elements,a=e.elements;return i[12]=a[12],i[13]=a[13],i[14]=a[14],this}setFromMatrix3(e){let i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,a){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this}makeBasis(e,i,a){return this.set(e.x,i.x,a.x,0,e.y,i.y,a.y,0,e.z,i.z,a.z,0,0,0,0,1),this}extractRotation(e){let i=this.elements,a=e.elements,r=1/zi.setFromMatrixColumn(e,0).length(),n=1/zi.setFromMatrixColumn(e,1).length(),s=1/zi.setFromMatrixColumn(e,2).length();return i[0]=a[0]*r,i[1]=a[1]*r,i[2]=a[2]*r,i[3]=0,i[4]=a[4]*n,i[5]=a[5]*n,i[6]=a[6]*n,i[7]=0,i[8]=a[8]*s,i[9]=a[9]*s,i[10]=a[10]*s,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){let i=this.elements,a=e.x,r=e.y,n=e.z,s=Math.cos(a),o=Math.sin(a),l=Math.cos(r),h=Math.sin(r),u=Math.cos(n),d=Math.sin(n);if(e.order==="XYZ"){let c=s*u,p=s*d,m=o*u,_=o*d;i[0]=l*u,i[4]=-l*d,i[8]=h,i[1]=p+m*h,i[5]=c-_*h,i[9]=-o*l,i[2]=_-c*h,i[6]=m+p*h,i[10]=s*l}else if(e.order==="YXZ"){let c=l*u,p=l*d,m=h*u,_=h*d;i[0]=c+_*o,i[4]=m*o-p,i[8]=s*h,i[1]=s*d,i[5]=s*u,i[9]=-o,i[2]=p*o-m,i[6]=_+c*o,i[10]=s*l}else if(e.order==="ZXY"){let c=l*u,p=l*d,m=h*u,_=h*d;i[0]=c-_*o,i[4]=-s*d,i[8]=m+p*o,i[1]=p+m*o,i[5]=s*u,i[9]=_-c*o,i[2]=-s*h,i[6]=o,i[10]=s*l}else if(e.order==="ZYX"){let c=s*u,p=s*d,m=o*u,_=o*d;i[0]=l*u,i[4]=m*h-p,i[8]=c*h+_,i[1]=l*d,i[5]=_*h+c,i[9]=p*h-m,i[2]=-h,i[6]=o*l,i[10]=s*l}else if(e.order==="YZX"){let c=s*l,p=s*h,m=o*l,_=o*h;i[0]=l*u,i[4]=_-c*d,i[8]=m*d+p,i[1]=d,i[5]=s*u,i[9]=-o*u,i[2]=-h*u,i[6]=p*d+m,i[10]=c-_*d}else if(e.order==="XZY"){let c=s*l,p=s*h,m=o*l,_=o*h;i[0]=l*u,i[4]=-d,i[8]=h*u,i[1]=c*d+_,i[5]=s*u,i[9]=p*d-m,i[2]=m*d-p,i[6]=o*u,i[10]=_*d+c}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_u,e,vu)}lookAt(e,i,a){let r=this.elements;return ut.subVectors(e,i),ut.lengthSq()===0&&(ut.z=1),ut.normalize(),ei.crossVectors(a,ut),ei.lengthSq()===0&&(Math.abs(a.z)===1?ut.x+=1e-4:ut.z+=1e-4,ut.normalize(),ei.crossVectors(a,ut)),ei.normalize(),$r.crossVectors(ut,ei),r[0]=ei.x,r[4]=$r.x,r[8]=ut.x,r[1]=ei.y,r[5]=$r.y,r[9]=ut.y,r[2]=ei.z,r[6]=$r.z,r[10]=ut.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){let a=e.elements,r=i.elements,n=this.elements,s=a[0],o=a[4],l=a[8],h=a[12],u=a[1],d=a[5],c=a[9],p=a[13],m=a[2],_=a[6],v=a[10],f=a[14],g=a[3],x=a[7],y=a[11],C=a[15],T=r[0],A=r[4],F=r[8],L=r[12],B=r[1],G=r[5],R=r[9],X=r[13],W=r[2],ae=r[6],ce=r[10],ne=r[14],q=r[3],J=r[7],z=r[11],$=r[15];return n[0]=s*T+o*B+l*W+h*q,n[4]=s*A+o*G+l*ae+h*J,n[8]=s*F+o*R+l*ce+h*z,n[12]=s*L+o*X+l*ne+h*$,n[1]=u*T+d*B+c*W+p*q,n[5]=u*A+d*G+c*ae+p*J,n[9]=u*F+d*R+c*ce+p*z,n[13]=u*L+d*X+c*ne+p*$,n[2]=m*T+_*B+v*W+f*q,n[6]=m*A+_*G+v*ae+f*J,n[10]=m*F+_*R+v*ce+f*z,n[14]=m*L+_*X+v*ne+f*$,n[3]=g*T+x*B+y*W+C*q,n[7]=g*A+x*G+y*ae+C*J,n[11]=g*F+x*R+y*ce+C*z,n[15]=g*L+x*X+y*ne+C*$,this}multiplyScalar(e){let i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){let e=this.elements,i=e[0],a=e[4],r=e[8],n=e[12],s=e[1],o=e[5],l=e[9],h=e[13],u=e[2],d=e[6],c=e[10],p=e[14];return e[3]*(+n*l*d-r*h*d-n*o*c+a*h*c+r*o*p-a*l*p)+e[7]*(+i*l*p-i*h*c+n*s*c-r*s*p+r*h*u-n*l*u)+e[11]*(+i*h*d-i*o*p-n*s*d+a*s*p+n*o*u-a*h*u)+e[15]*(-r*o*u-i*l*d+i*o*c+r*s*d-a*s*c+a*l*u)}transpose(){let e=this.elements,i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,a){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=i,r[14]=a),this}invert(){let e=this.elements,i=e[0],a=e[1],r=e[2],n=e[3],s=e[4],o=e[5],l=e[6],h=e[7],u=e[8],d=e[9],c=e[10],p=e[11],m=e[12],_=e[13],v=e[14],f=e[15],g=d*v*h-_*c*h+_*l*p-o*v*p-d*l*f+o*c*f,x=m*c*h-u*v*h-m*l*p+s*v*p+u*l*f-s*c*f,y=u*_*h-m*d*h+m*o*p-s*_*p-u*o*f+s*d*f,C=m*d*l-u*_*l-m*o*c+s*_*c+u*o*v-s*d*v,T=i*g+a*x+r*y+n*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return e[0]=g*A,e[1]=(_*c*n-d*v*n-_*r*p+a*v*p+d*r*f-a*c*f)*A,e[2]=(o*v*n-_*l*n+_*r*h-a*v*h-o*r*f+a*l*f)*A,e[3]=(d*l*n-o*c*n-d*r*h+a*c*h+o*r*p-a*l*p)*A,e[4]=x*A,e[5]=(u*v*n-m*c*n+m*r*p-i*v*p-u*r*f+i*c*f)*A,e[6]=(m*l*n-s*v*n-m*r*h+i*v*h+s*r*f-i*l*f)*A,e[7]=(s*c*n-u*l*n+u*r*h-i*c*h-s*r*p+i*l*p)*A,e[8]=y*A,e[9]=(m*d*n-u*_*n-m*a*p+i*_*p+u*a*f-i*d*f)*A,e[10]=(s*_*n-m*o*n+m*a*h-i*_*h-s*a*f+i*o*f)*A,e[11]=(u*o*n-s*d*n-u*a*h+i*d*h+s*a*p-i*o*p)*A,e[12]=C*A,e[13]=(u*_*r-m*d*r+m*a*c-i*_*c-u*a*v+i*d*v)*A,e[14]=(m*o*r-s*_*r-m*a*l+i*_*l+s*a*v-i*o*v)*A,e[15]=(s*d*r-u*o*r+u*a*l-i*d*l-s*a*c+i*o*c)*A,this}scale(e){let i=this.elements,a=e.x,r=e.y,n=e.z;return i[0]*=a,i[4]*=r,i[8]*=n,i[1]*=a,i[5]*=r,i[9]*=n,i[2]*=a,i[6]*=r,i[10]*=n,i[3]*=a,i[7]*=r,i[11]*=n,this}getMaxScaleOnAxis(){let e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,a,r))}makeTranslation(e,i,a){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,a,0,0,0,1),this}makeRotationX(e){let i=Math.cos(e),a=Math.sin(e);return this.set(1,0,0,0,0,i,-a,0,0,a,i,0,0,0,0,1),this}makeRotationY(e){let i=Math.cos(e),a=Math.sin(e);return this.set(i,0,a,0,0,1,0,0,-a,0,i,0,0,0,0,1),this}makeRotationZ(e){let i=Math.cos(e),a=Math.sin(e);return this.set(i,-a,0,0,a,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){let a=Math.cos(i),r=Math.sin(i),n=1-a,s=e.x,o=e.y,l=e.z,h=n*s,u=n*o;return this.set(h*s+a,h*o-r*l,h*l+r*o,0,h*o+r*l,u*o+a,u*l-r*s,0,h*l-r*o,u*l+r*s,n*l*l+a,0,0,0,0,1),this}makeScale(e,i,a){return this.set(e,0,0,0,0,i,0,0,0,0,a,0,0,0,0,1),this}makeShear(e,i,a,r,n,s){return this.set(1,a,n,0,e,1,s,0,i,r,1,0,0,0,0,1),this}compose(e,i,a){let r=this.elements,n=i._x,s=i._y,o=i._z,l=i._w,h=n+n,u=s+s,d=o+o,c=n*h,p=n*u,m=n*d,_=s*u,v=s*d,f=o*d,g=l*h,x=l*u,y=l*d,C=a.x,T=a.y,A=a.z;return r[0]=(1-(_+f))*C,r[1]=(p+y)*C,r[2]=(m-x)*C,r[3]=0,r[4]=(p-y)*T,r[5]=(1-(c+f))*T,r[6]=(v+g)*T,r[7]=0,r[8]=(m+x)*A,r[9]=(v-g)*A,r[10]=(1-(c+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,i,a){let r=this.elements,n=zi.set(r[0],r[1],r[2]).length(),s=zi.set(r[4],r[5],r[6]).length(),o=zi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(n=-n),e.x=r[12],e.y=r[13],e.z=r[14],Et.copy(this);let l=1/n,h=1/s,u=1/o;return Et.elements[0]*=l,Et.elements[1]*=l,Et.elements[2]*=l,Et.elements[4]*=h,Et.elements[5]*=h,Et.elements[6]*=h,Et.elements[8]*=u,Et.elements[9]*=u,Et.elements[10]*=u,i.setFromRotationMatrix(Et),a.x=n,a.y=s,a.z=o,this}makePerspective(e,i,a,r,n,s,o=2e3){let l=this.elements,h=2*n/(i-e),u=2*n/(a-r),d=(i+e)/(i-e),c=(a+r)/(a-r),p,m;if(o===cr)p=-(s+n)/(s-n),m=-2*s*n/(s-n);else{if(o!==Ba)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-s/(s-n),m=-s*n/(s-n)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=c,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,i,a,r,n,s,o=2e3){let l=this.elements,h=1/(i-e),u=1/(a-r),d=1/(s-n),c=(i+e)*h,p=(a+r)*u,m,_;if(o===cr)m=(s+n)*d,_=-2*d;else{if(o!==Ba)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=n*d,_=-1*d}return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-c,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let i=this.elements,a=e.elements;for(let r=0;r<16;r++)if(i[r]!==a[r])return!1;return!0}fromArray(e,i=0){for(let a=0;a<16;a++)this.elements[a]=e[a+i];return this}toArray(e=[],i=0){let a=this.elements;return e[i]=a[0],e[i+1]=a[1],e[i+2]=a[2],e[i+3]=a[3],e[i+4]=a[4],e[i+5]=a[5],e[i+6]=a[6],e[i+7]=a[7],e[i+8]=a[8],e[i+9]=a[9],e[i+10]=a[10],e[i+11]=a[11],e[i+12]=a[12],e[i+13]=a[13],e[i+14]=a[14],e[i+15]=a[15],e}},zi=new w,Et=new Pe,_u=new w(0,0,0),vu=new w(1,1,1),ei=new w,$r=new w,ut=new w,vo=new Pe,xo=new hi,zl=class Bl{constructor(e=0,i=0,a=0,r=Bl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=a,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,a,r=this._order){return this._x=e,this._y=i,this._z=a,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,a=!0){let r=e.elements,n=r[0],s=r[4],o=r[8],l=r[1],h=r[5],u=r[9],d=r[2],c=r[6],p=r[10];switch(i){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,n)):(this._x=Math.atan2(c,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,n),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,h)):(this._y=0,this._z=Math.atan2(l,n));break;case"ZYX":this._y=Math.asin(-Qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(c,p),this._z=Math.atan2(l,n)):(this._x=0,this._z=Math.atan2(-s,h));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,n)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Qe(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(c,h),this._y=Math.atan2(o,n)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,a===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,a){return vo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vo,i,a)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return xo.setFromEuler(this),this.setFromQuaternion(xo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zl.DEFAULT_ORDER="XYZ";var Hl=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!=0}isEnabled(t){return(this.mask&(1<<t|0))!=0}},xu=0,yo=new w,Bi=new hi,Bt=new Pe,Qr=new w,Mr=new w,yu=new w,Su=new hi,So=new w(1,0,0),Mo=new w(0,1,0),Eo=new w(0,0,1),Mu={type:"added"},Eu={type:"removed"},Ut=class Aa extends pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Aa.DEFAULT_UP.clone();let e=new w,i=new zl,a=new hi,r=new w(1,1,1);i._onChange((function(){a.setFromEuler(i,!1)})),a._onChange((function(){i.setFromQuaternion(a,void 0,!1)})),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Pe},normalMatrix:{value:new Ce}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=Aa.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Aa.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Bi.setFromAxisAngle(e,i),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(e,i){return Bi.setFromAxisAngle(e,i),this.quaternion.premultiply(Bi),this}rotateX(e){return this.rotateOnAxis(So,e)}rotateY(e){return this.rotateOnAxis(Mo,e)}rotateZ(e){return this.rotateOnAxis(Eo,e)}translateOnAxis(e,i){return yo.copy(e).applyQuaternion(this.quaternion),this.position.add(yo.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(So,e)}translateY(e){return this.translateOnAxis(Mo,e)}translateZ(e){return this.translateOnAxis(Eo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bt.copy(this.matrixWorld).invert())}lookAt(e,i,a){e.isVector3?Qr.copy(e):Qr.set(e,i,a);let r=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bt.lookAt(Mr,Qr,this.up):Bt.lookAt(Qr,Mr,this.up),this.quaternion.setFromRotationMatrix(Bt),r&&(Bt.extractRotation(r.matrixWorld),Bi.setFromRotationMatrix(Bt),this.quaternion.premultiply(Bi.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Mu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}let i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(Eu)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bt),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let a=0,r=this.children.length;a<r;a++){let n=this.children[a].getObjectByProperty(e,i);if(n!==void 0)return n}}getObjectsByProperty(e,i,a=[]){this[e]===i&&a.push(this);let r=this.children;for(let n=0,s=r.length;n<s;n++)r[n].getObjectsByProperty(e,i,a);return a}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,yu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,Su,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);let i=this.children;for(let a=0,r=i.length;a<r;a++)i[a].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let i=this.children;for(let a=0,r=i.length;a<r;a++)i[a].traverseVisible(e)}traverseAncestors(e){let i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let i=this.children;for(let a=0,r=i.length;a<r;a++){let n=i[a];n.matrixWorldAutoUpdate!==!0&&e!==!0||n.updateMatrixWorld(e)}}updateWorldMatrix(e,i){let a=this.parent;if(e===!0&&a!==null&&a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),i===!0){let r=this.children;for(let n=0,s=r.length;n<s;n++){let o=r[n];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let i=e===void 0||typeof e=="string",a={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};function n(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map((o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()}))),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()})),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=n(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){let d=l[h];n(e.shapes,d)}else n(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(n(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(n(e.materials,this.material[l]));r.material=o}else r.material=n(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(n(e.animations,l))}}if(i){let o=s(e.geometries),l=s(e.materials),h=s(e.textures),u=s(e.images),d=s(e.shapes),c=s(e.skeletons),p=s(e.animations),m=s(e.nodes);o.length>0&&(a.geometries=o),l.length>0&&(a.materials=l),h.length>0&&(a.textures=h),u.length>0&&(a.images=u),d.length>0&&(a.shapes=d),c.length>0&&(a.skeletons=c),p.length>0&&(a.animations=p),m.length>0&&(a.nodes=m)}return a.object=r,a;function s(o){let l=[];for(let h in o){let u=o[h];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let a=0;a<e.children.length;a++){let r=e.children[a];this.add(r.clone())}return this}};Ut.DEFAULT_UP=new w(0,1,0),Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Tt=new w,Ht=new w,Mn=new w,Gt=new w,Hi=new w,Gi=new w,To=new w,En=new w,Tn=new w,bn=new w,Ar=class Ji{constructor(e=new w,i=new w,a=new w){this.a=e,this.b=i,this.c=a}static getNormal(e,i,a,r){r.subVectors(a,i),Tt.subVectors(e,i),r.cross(Tt);let n=r.lengthSq();return n>0?r.multiplyScalar(1/Math.sqrt(n)):r.set(0,0,0)}static getBarycoord(e,i,a,r,n){Tt.subVectors(r,i),Ht.subVectors(a,i),Mn.subVectors(e,i);let s=Tt.dot(Tt),o=Tt.dot(Ht),l=Tt.dot(Mn),h=Ht.dot(Ht),u=Ht.dot(Mn),d=s*h-o*o;if(d===0)return n.set(0,0,0),null;let c=1/d,p=(h*l-o*u)*c,m=(s*u-o*l)*c;return n.set(1-p-m,m,p)}static containsPoint(e,i,a,r){return this.getBarycoord(e,i,a,r,Gt)!==null&&Gt.x>=0&&Gt.y>=0&&Gt.x+Gt.y<=1}static getInterpolation(e,i,a,r,n,s,o,l){return this.getBarycoord(e,i,a,r,Gt)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(n,Gt.x),l.addScaledVector(s,Gt.y),l.addScaledVector(o,Gt.z),l)}static isFrontFacing(e,i,a,r){return Tt.subVectors(a,i),Ht.subVectors(e,i),Tt.cross(Ht).dot(r)<0}set(e,i,a){return this.a.copy(e),this.b.copy(i),this.c.copy(a),this}setFromPointsAndIndices(e,i,a,r){return this.a.copy(e[i]),this.b.copy(e[a]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,i,a,r){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,a),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tt.subVectors(this.c,this.b),Ht.subVectors(this.a,this.b),.5*Tt.cross(Ht).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ji.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ji.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,a,r,n){return Ji.getInterpolation(e,this.a,this.b,this.c,i,a,r,n)}containsPoint(e){return Ji.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ji.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){let a=this.a,r=this.b,n=this.c,s,o;Hi.subVectors(r,a),Gi.subVectors(n,a),En.subVectors(e,a);let l=Hi.dot(En),h=Gi.dot(En);if(l<=0&&h<=0)return i.copy(a);Tn.subVectors(e,r);let u=Hi.dot(Tn),d=Gi.dot(Tn);if(u>=0&&d<=u)return i.copy(r);let c=l*d-u*h;if(c<=0&&l>=0&&u<=0)return s=l/(l-u),i.copy(a).addScaledVector(Hi,s);bn.subVectors(e,n);let p=Hi.dot(bn),m=Gi.dot(bn);if(m>=0&&p<=m)return i.copy(n);let _=p*h-l*m;if(_<=0&&h>=0&&m<=0)return o=h/(h-m),i.copy(a).addScaledVector(Gi,o);let v=u*m-p*d;if(v<=0&&d-u>=0&&p-m>=0)return To.subVectors(n,r),o=(d-u)/(d-u+(p-m)),i.copy(r).addScaledVector(To,o);let f=1/(v+_+c);return s=_*f,o=c*f,i.copy(a).addScaledVector(Hi,s).addScaledVector(Gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Gl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},ea={h:0,s:0,l:0};function wn(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*(e-t)*i:i<.5?e:i<2/3?t+6*(e-t)*(2/3-i):t}var Ue=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(255&t)/255,Oe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,a=Oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,Oe.toWorkingColorSpace(this,a),this}setHSL(t,e,i,a=Oe.workingColorSpace){if(t=Jn(t,1),e=Qe(e,0,1),i=Qe(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,n=2*i-r;this.r=wn(n,r,t+1/3),this.g=wn(n,r,t),this.b=wn(n,r,t-1/3)}return Oe.toWorkingColorSpace(this,a),this}setStyle(t,e=je){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,n=a[1],s=a[2];switch(n){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=a[1],n=r.length;if(n===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(n===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=je){let i=Gl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=nr(t.r),this.g=nr(t.g),this.b=nr(t.b),this}copyLinearToSRGB(t){return this.r=fn(t.r),this.g=fn(t.g),this.b=fn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=je){return Oe.fromWorkingColorSpace(rt.copy(this),t),65536*Math.round(Qe(255*rt.r,0,255))+256*Math.round(Qe(255*rt.g,0,255))+Math.round(Qe(255*rt.b,0,255))}getHexString(t=je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Oe.workingColorSpace){Oe.fromWorkingColorSpace(rt.copy(this),e);let i=rt.r,a=rt.g,r=rt.b,n=Math.max(i,a,r),s=Math.min(i,a,r),o,l,h=(s+n)/2;if(s===n)o=0,l=0;else{let u=n-s;switch(l=h<=.5?u/(n+s):u/(2-n-s),n){case i:o=(a-r)/u+(a<r?6:0);break;case a:o=(r-i)/u+2;break;case r:o=(i-a)/u+4}o/=6}return t.h=o,t.s=l,t.l=h,t}getRGB(t,e=Oe.workingColorSpace){return Oe.fromWorkingColorSpace(rt.copy(this),e),t.r=rt.r,t.g=rt.g,t.b=rt.b,t}getStyle(t=je){Oe.fromWorkingColorSpace(rt.copy(this),t);let e=rt.r,i=rt.g,a=rt.b;return t!==je?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(255*e)},${Math.round(255*i)},${Math.round(255*a)})`}offsetHSL(t,e,i){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(ea);let i=Cr(ti.h,ea.h,e),a=Cr(ti.s,ea.s,e),r=Cr(ti.l,ea.l,e);return this.setHSL(i,a,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,a=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*a,this.g=r[1]*e+r[4]*i+r[7]*a,this.b=r[2]*e+r[5]*i+r[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rt=new Ue;Ue.NAMES=Gl;var Tu=0,Hr=class extends pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=Li(),this.name="",this.type="Material",this.blending=1,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wn,this.blendDst=Xn,this.blendEquation=Mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ui,this.stencilZFail=Ui,this.stencilZPass=Ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let a=this[e];a!==void 0?a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[e]=i:console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`)}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};function a(r){let n=[];for(let s in r){let o=r[s];delete o.metadata,n.push(o)}return n}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(i.blending=this.blending),this.side!==ni&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wn&&(i.blendSrc=this.blendSrc),this.blendDst!==Xn&&(i.blendDst=this.blendDst),this.blendEquation!==Mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ui&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ui&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ui&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData),e){let r=a(t.textures),n=a(t.images);r.length>0&&(i.textures=r),n.length>0&&(i.images=n)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let a=e.length;i=new Array(a);for(let r=0;r!==a;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},si=class extends Hr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Rp=bu();function bu(){let t=new ArrayBuffer(4),e=new Float32Array(t),i=new Uint32Array(t),a=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){let h=l-127;h<-27?(a[l]=0,a[256|l]=32768,r[l]=24,r[256|l]=24):h<-14?(a[l]=1024>>-h-14,a[256|l]=1024>>-h-14|32768,r[l]=-h-1,r[256|l]=-h-1):h<=15?(a[l]=h+15<<10,a[256|l]=h+15<<10|32768,r[l]=13,r[256|l]=13):h<128?(a[l]=31744,a[256|l]=64512,r[l]=24,r[256|l]=24):(a[l]=31744,a[256|l]=64512,r[l]=13,r[256|l]=13)}let n=new Uint32Array(2048),s=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let h=l<<13,u=0;for(;(8388608&h)==0;)h<<=1,u-=8388608;h&=-8388609,u+=947912704,n[l]=h|u}for(let l=1024;l<2048;++l)n[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)s[l]=l<<23;s[31]=1199570944,s[32]=2147483648;for(let l=33;l<63;++l)s[l]=2147483648+(l-32<<23);s[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:i,baseTable:a,shiftTable:r,mantissaTable:n,exponentTable:s,offsetTable:o}}var qe=new w,ta=new se,vt=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=uo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Xt,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return ar("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[t+a]=e.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ta.fromBufferAttribute(this,e),ta.applyMatrix3(t),this.setXY(e,ta.x,ta.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix3(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=at(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ki(e,this.array)),e}setX(t,e){return this.normalized&&(e=at(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ki(e,this.array)),e}setY(t,e){return this.normalized&&(e=at(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ki(e,this.array)),e}setZ(t,e){return this.normalized&&(e=at(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ki(e,this.array)),e}setW(t,e){return this.normalized&&(e=at(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=at(e,this.array),i=at(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,a){return t*=this.itemSize,this.normalized&&(e=at(e,this.array),i=at(i,this.array),a=at(a,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,e,i,a,r){return t*=this.itemSize,this.normalized&&(e=at(e,this.array),i=at(i,this.array),a=at(a,this.array),r=at(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==uo&&(t.usage=this.usage),t}},Vl=class extends vt{constructor(t,e,i){super(new Uint16Array(t),e,i)}},kl=class extends vt{constructor(t,e,i){super(new Uint32Array(t),e,i)}},Me=class extends vt{constructor(t,e,i){super(new Float32Array(t),e,i)}},wu=0,mt=new Pe,An=new Ut,Vi=new w,ct=new ui,Er=new ui,$e=new w,Xe=class Wl extends pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nl(e)?kl:Vl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,a=0){this.groups.push({start:e,count:i,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){let i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);let a=this.attributes.normal;if(a!==void 0){let n=new Ce().getNormalMatrix(e);a.applyNormalMatrix(n),a.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mt.makeRotationFromQuaternion(e),this.applyMatrix4(mt),this}rotateX(e){return mt.makeRotationX(e),this.applyMatrix4(mt),this}rotateY(e){return mt.makeRotationY(e),this.applyMatrix4(mt),this}rotateZ(e){return mt.makeRotationZ(e),this.applyMatrix4(mt),this}translate(e,i,a){return mt.makeTranslation(e,i,a),this.applyMatrix4(mt),this}scale(e,i,a){return mt.makeScale(e,i,a),this.applyMatrix4(mt),this}lookAt(e){return An.lookAt(e),An.updateMatrix(),this.applyMatrix4(An.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){let i=[];for(let a=0,r=e.length;a<r;a++){let n=e[a];i.push(n.x,n.y,n.z||0)}return this.setAttribute("position",new Me(i,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);let e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let a=0,r=i.length;a<r;a++){let n=i[a];ct.setFromBufferAttribute(n),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,ct.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,ct.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(ct.min),this.boundingBox.expandByPoint(ct.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);let e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),void this.boundingSphere.set(new w,1/0);if(e){let a=this.boundingSphere.center;if(ct.setFromBufferAttribute(e),i)for(let n=0,s=i.length;n<s;n++){let o=i[n];Er.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(ct.min,Er.min),ct.expandByPoint($e),$e.addVectors(ct.max,Er.max),ct.expandByPoint($e)):(ct.expandByPoint(Er.min),ct.expandByPoint(Er.max))}ct.getCenter(a);let r=0;for(let n=0,s=e.count;n<s;n++)$e.fromBufferAttribute(e,n),r=Math.max(r,a.distanceToSquared($e));if(i)for(let n=0,s=i.length;n<s;n++){let o=i[n],l=this.morphTargetsRelative;for(let h=0,u=o.count;h<u;h++)$e.fromBufferAttribute(o,h),l&&(Vi.fromBufferAttribute(e,h),$e.add(Vi)),r=Math.max(r,a.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let a=e.array,r=i.position.array,n=i.normal.array,s=i.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vt(new Float32Array(4*o),4));let l=this.getAttribute("tangent").array,h=[],u=[];for(let B=0;B<o;B++)h[B]=new w,u[B]=new w;let d=new w,c=new w,p=new w,m=new se,_=new se,v=new se,f=new w,g=new w;function x(B,G,R){d.fromArray(r,3*B),c.fromArray(r,3*G),p.fromArray(r,3*R),m.fromArray(s,2*B),_.fromArray(s,2*G),v.fromArray(s,2*R),c.sub(d),p.sub(d),_.sub(m),v.sub(m);let X=1/(_.x*v.y-v.x*_.y);isFinite(X)&&(f.copy(c).multiplyScalar(v.y).addScaledVector(p,-_.y).multiplyScalar(X),g.copy(p).multiplyScalar(_.x).addScaledVector(c,-v.x).multiplyScalar(X),h[B].add(f),h[G].add(f),h[R].add(f),u[B].add(g),u[G].add(g),u[R].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:a.length}]);for(let B=0,G=y.length;B<G;++B){let R=y[B],X=R.start;for(let W=X,ae=X+R.count;W<ae;W+=3)x(a[W+0],a[W+1],a[W+2])}let C=new w,T=new w,A=new w,F=new w;function L(B){A.fromArray(n,3*B),F.copy(A);let G=h[B];C.copy(G),C.sub(A.multiplyScalar(A.dot(G))).normalize(),T.crossVectors(F,G);let R=T.dot(u[B])<0?-1:1;l[4*B]=C.x,l[4*B+1]=C.y,l[4*B+2]=C.z,l[4*B+3]=R}for(let B=0,G=y.length;B<G;++B){let R=y[B],X=R.start;for(let W=X,ae=X+R.count;W<ae;W+=3)L(a[W+0]),L(a[W+1]),L(a[W+2])}}computeVertexNormals(){let e=this.index,i=this.getAttribute("position");if(i!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new vt(new Float32Array(3*i.count),3),this.setAttribute("normal",a);else for(let c=0,p=a.count;c<p;c++)a.setXYZ(c,0,0,0);let r=new w,n=new w,s=new w,o=new w,l=new w,h=new w,u=new w,d=new w;if(e)for(let c=0,p=e.count;c<p;c+=3){let m=e.getX(c+0),_=e.getX(c+1),v=e.getX(c+2);r.fromBufferAttribute(i,m),n.fromBufferAttribute(i,_),s.fromBufferAttribute(i,v),u.subVectors(s,n),d.subVectors(r,n),u.cross(d),o.fromBufferAttribute(a,m),l.fromBufferAttribute(a,_),h.fromBufferAttribute(a,v),o.add(u),l.add(u),h.add(u),a.setXYZ(m,o.x,o.y,o.z),a.setXYZ(_,l.x,l.y,l.z),a.setXYZ(v,h.x,h.y,h.z)}else for(let c=0,p=i.count;c<p;c+=3)r.fromBufferAttribute(i,c+0),n.fromBufferAttribute(i,c+1),s.fromBufferAttribute(i,c+2),u.subVectors(s,n),d.subVectors(r,n),u.cross(d),a.setXYZ(c+0,u.x,u.y,u.z),a.setXYZ(c+1,u.x,u.y,u.z),a.setXYZ(c+2,u.x,u.y,u.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let i=0,a=e.count;i<a;i++)$e.fromBufferAttribute(e,i),$e.normalize(),e.setXYZ(i,$e.x,$e.y,$e.z)}toNonIndexed(){function e(o,l){let h=o.array,u=o.itemSize,d=o.normalized,c=new h.constructor(l.length*u),p=0,m=0;for(let _=0,v=l.length;_<v;_++){p=o.isInterleavedBufferAttribute?l[_]*o.data.stride+o.offset:l[_]*u;for(let f=0;f<u;f++)c[m++]=h[p++]}return new vt(c,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let i=new Wl,a=this.index.array,r=this.attributes;for(let o in r){let l=e(r[o],a);i.setAttribute(o,l)}let n=this.morphAttributes;for(let o in n){let l=[],h=n[o];for(let u=0,d=h.length;u<d;u++){let c=e(h[u],a);l.push(c)}i.morphAttributes[o]=l}i.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let o=0,l=s.length;o<l;o++){let h=s[o];i.addGroup(h.start,h.count,h.materialIndex)}return i}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let h in l)l[h]!==void 0&&(e[h]=l[h]);return e}e.data={attributes:{}};let i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});let a=this.attributes;for(let l in a){let h=a[l];e.data.attributes[l]=h.toJSON(e.data)}let r={},n=!1;for(let l in this.morphAttributes){let h=this.morphAttributes[l],u=[];for(let d=0,c=h.length;d<c;d++){let p=h[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,n=!0)}n&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let i={};this.name=e.name;let a=e.index;a!==null&&this.setIndex(a.clone(i));let r=e.attributes;for(let h in r){let u=r[h];this.setAttribute(h,u.clone(i))}let n=e.morphAttributes;for(let h in n){let u=[],d=n[h];for(let c=0,p=d.length;c<p;c++)u.push(d[c].clone(i));this.morphAttributes[h]=u}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let h=0,u=s.length;h<u;h++){let d=s[h];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bo=new Pe,vi=new Za,ia=new ci,wo=new w,ki=new w,Wi=new w,Xi=new w,Rn=new w,ra=new w,aa=new se,na=new se,sa=new se,Ao=new w,Ro=new w,Co=new w,oa=new w,la=new w,Ze=class extends Ut{constructor(t=new Xe,e=new si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,e=Object.keys(t);if(e.length>0){let i=t[e[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){let n=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=a}}}}getVertexPosition(t,e){let i=this.geometry,a=i.attributes.position,r=i.morphAttributes.position,n=i.morphTargetsRelative;e.fromBufferAttribute(a,t);let s=this.morphTargetInfluences;if(r&&s){ra.set(0,0,0);for(let o=0,l=r.length;o<l;o++){let h=s[o],u=r[o];h!==0&&(Rn.fromBufferAttribute(u,t),n?ra.addScaledVector(Rn,h):ra.addScaledVector(Rn.sub(e),h))}e.add(ra)}return e}raycast(t,e){let i=this.geometry,a=this.material,r=this.matrixWorld;if(a!==void 0){if(i.boundingSphere===null&&i.computeBoundingSphere(),ia.copy(i.boundingSphere),ia.applyMatrix4(r),vi.copy(t.ray).recast(t.near),ia.containsPoint(vi.origin)===!1&&(vi.intersectSphere(ia,wo)===null||vi.origin.distanceToSquared(wo)>(t.far-t.near)**2))return;bo.copy(r).invert(),vi.copy(t.ray).applyMatrix4(bo),i.boundingBox!==null&&vi.intersectsBox(i.boundingBox)===!1||this._computeIntersections(t,e,vi)}}_computeIntersections(t,e,i){let a,r=this.geometry,n=this.material,s=r.index,o=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,c=r.drawRange;if(s!==null)if(Array.isArray(n))for(let p=0,m=d.length;p<m;p++){let _=d[p],v=n[_.materialIndex];for(let f=Math.max(_.start,c.start),g=Math.min(s.count,Math.min(_.start+_.count,c.start+c.count));f<g;f+=3)a=ha(this,v,t,i,l,h,u,s.getX(f),s.getX(f+1),s.getX(f+2)),a&&(a.faceIndex=Math.floor(f/3),a.face.materialIndex=_.materialIndex,e.push(a))}else for(let p=Math.max(0,c.start),m=Math.min(s.count,c.start+c.count);p<m;p+=3)a=ha(this,n,t,i,l,h,u,s.getX(p),s.getX(p+1),s.getX(p+2)),a&&(a.faceIndex=Math.floor(p/3),e.push(a));else if(o!==void 0)if(Array.isArray(n))for(let p=0,m=d.length;p<m;p++){let _=d[p],v=n[_.materialIndex];for(let f=Math.max(_.start,c.start),g=Math.min(o.count,Math.min(_.start+_.count,c.start+c.count));f<g;f+=3)a=ha(this,v,t,i,l,h,u,f,f+1,f+2),a&&(a.faceIndex=Math.floor(f/3),a.face.materialIndex=_.materialIndex,e.push(a))}else for(let p=Math.max(0,c.start),m=Math.min(o.count,c.start+c.count);p<m;p+=3)a=ha(this,n,t,i,l,h,u,p,p+1,p+2),a&&(a.faceIndex=Math.floor(p/3),e.push(a))}};function ha(t,e,i,a,r,n,s,o,l,h){t.getVertexPosition(o,ki),t.getVertexPosition(l,Wi),t.getVertexPosition(h,Xi);let u=(function(d,c,p,m,_,v,f,g){let x;if(x=c.side===lt?m.intersectTriangle(f,v,_,!0,g):m.intersectTriangle(_,v,f,c.side===ni,g),x===null)return null;la.copy(g),la.applyMatrix4(d.matrixWorld);let y=p.ray.origin.distanceTo(la);return y<p.near||y>p.far?null:{distance:y,point:la.clone(),object:d}})(t,e,i,a,ki,Wi,Xi,oa);if(u){r&&(aa.fromBufferAttribute(r,o),na.fromBufferAttribute(r,l),sa.fromBufferAttribute(r,h),u.uv=Ar.getInterpolation(oa,ki,Wi,Xi,aa,na,sa,new se)),n&&(aa.fromBufferAttribute(n,o),na.fromBufferAttribute(n,l),sa.fromBufferAttribute(n,h),u.uv1=Ar.getInterpolation(oa,ki,Wi,Xi,aa,na,sa,new se),u.uv2=u.uv1),s&&(Ao.fromBufferAttribute(s,o),Ro.fromBufferAttribute(s,l),Co.fromBufferAttribute(s,h),u.normal=Ar.getInterpolation(oa,ki,Wi,Xi,Ao,Ro,Co,new w),u.normal.dot(a.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:l,c:h,normal:new w,materialIndex:0};Ar.getNormal(ki,Wi,Xi,d.normal),u.face=d}return u}var Ka=class Xl extends Xe{constructor(e=1,i=1,a=1,r=1,n=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:a,widthSegments:r,heightSegments:n,depthSegments:s};let o=this;r=Math.floor(r),n=Math.floor(n),s=Math.floor(s);let l=[],h=[],u=[],d=[],c=0,p=0;function m(_,v,f,g,x,y,C,T,A,F,L){let B=y/A,G=C/F,R=y/2,X=C/2,W=T/2,ae=A+1,ce=F+1,ne=0,q=0,J=new w;for(let z=0;z<ce;z++){let $=z*G-X;for(let le=0;le<ae;le++){let M=le*B-R;J[_]=M*g,J[v]=$*x,J[f]=W,h.push(J.x,J.y,J.z),J[_]=0,J[v]=0,J[f]=T>0?1:-1,u.push(J.x,J.y,J.z),d.push(le/A),d.push(1-z/F),ne+=1}}for(let z=0;z<F;z++)for(let $=0;$<A;$++){let le=c+$+ae*z,M=c+$+ae*(z+1),S=c+($+1)+ae*(z+1),N=c+($+1)+ae*z;l.push(le,M,N),l.push(M,S,N),q+=6}o.addGroup(p,q,L),p+=q,c+=ne}m("z","y","x",-1,-1,a,i,e,s,n,0),m("z","y","x",1,-1,a,i,-e,s,n,1),m("x","z","y",1,1,e,a,i,r,s,2),m("x","z","y",1,-1,e,a,-i,r,s,3),m("x","y","z",1,-1,e,i,a,r,n,4),m("x","y","z",-1,-1,e,i,-a,r,n,5),this.setIndex(l),this.setAttribute("position",new Me(h,3)),this.setAttribute("normal",new Me(u,3)),this.setAttribute("uv",new Me(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function dr(t){let e={};for(let i in t){e[i]={};for(let a in t[i]){let r=t[i][a];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][a]=null):e[i][a]=r.clone():Array.isArray(r)?e[i][a]=r.slice():e[i][a]=r}}return e}function nt(t){let e={};for(let i=0;i<t.length;i++){let a=dr(t[i]);for(let r in a)e[r]=a[r]}return e}function ql(t){return t.getRenderTarget()===null?t.outputColorSpace:Oe.workingColorSpace}var Au={clone:dr,merge:nt},oi=class extends Hr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=dr(t.uniforms),this.uniformsGroups=(function(e){let i=[];for(let a=0;a<e.length;a++)i.push(e[a].clone());return i})(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let a in this.uniforms){let r=this.uniforms[a].value;r&&r.isTexture?e.uniforms[a]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[a]={type:"m4",value:r.toArray()}:e.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},cs=class extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=cr}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ii=new w,Po=new se,Lo=new se,gt=class extends cs{constructor(t=50,e=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=2*Or*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(.5*rr*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return 2*Or*Math.atan(Math.tan(.5*rr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,Po,Lo),e.subVectors(Lo,Po)}setViewOffset(t,e,i,a,r,n){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(.5*rr*this.fov)/this.zoom,i=2*e,a=this.aspect*i,r=-.5*a,n=this.view;if(this.view!==null&&this.view.enabled){let o=n.fullWidth,l=n.fullHeight;r+=n.offsetX*a/o,e-=n.offsetY*i/l,a*=n.width/o,i*=n.height/l}let s=this.filmOffset;s!==0&&(r+=t*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},qi=-90,Ru=class extends Ut{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let a=new gt(qi,1,t,e);a.layers=this.layers,this.add(a);let r=new gt(qi,1,t,e);r.layers=this.layers,this.add(r);let n=new gt(qi,1,t,e);n.layers=this.layers,this.add(n);let s=new gt(qi,1,t,e);s.layers=this.layers,this.add(s);let o=new gt(qi,1,t,e);o.layers=this.layers,this.add(o);let l=new gt(qi,1,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,a,r,n,s,o]=e;for(let l of e)this.remove(l);if(t===cr)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),n.up.set(0,0,1),n.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else{if(t!==Ba)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),n.up.set(0,0,-1),n.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1)}for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,n,s,o,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),c=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let m=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,a),t.render(e,r),t.setRenderTarget(i,1,a),t.render(e,n),t.setRenderTarget(i,2,a),t.render(e,s),t.setRenderTarget(i,3,a),t.render(e,o),t.setRenderTarget(i,4,a),t.render(e,l),i.texture.generateMipmaps=m,t.setRenderTarget(i,5,a),t.render(e,h),t.setRenderTarget(u,d,c),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},jl=class extends _t{constructor(t,e,i,a,r,n,s,o,l,h){super(t=t!==void 0?t:[],e=e!==void 0?e:lr,i,a,r,n,s,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Cu=class extends Ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];e.encoding!==void 0&&(ar("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Ai?je:Nt),this.texture=new jl(a,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0&&e.generateMipmaps,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:dt}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Ka(5,5,5),r=new oi({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:lt,blending:0});r.uniforms.tEquirect.value=e;let n=new Ze(a,r),s=e.minFilter;return e.minFilter===Qi&&(e.minFilter=dt),new Ru(1,10,this).update(t,n),e.minFilter=s,n.geometry.dispose(),n.material.dispose(),this}clear(t,e,i,a){let r=t.getRenderTarget();for(let n=0;n<6;n++)t.setRenderTarget(this,n),t.clear(e,i,a);t.setRenderTarget(r)}},Cn=new w,Pu=new w,Lu=new Ce,yi=class{constructor(t=new w(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,a){return this.normal.set(t,e,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let a=Cn.subVectors(i,e).cross(Pu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(Cn),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Lu.getNormalMatrix(t),a=this.coplanarPoint(Cn).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},xi=new ci,ua=new w,ds=class{constructor(t=new yi,e=new yi,i=new yi,a=new yi,r=new yi,n=new yi){this.planes=[t,e,i,a,r,n]}set(t,e,i,a,r,n){let s=this.planes;return s[0].copy(t),s[1].copy(e),s[2].copy(i),s[3].copy(a),s[4].copy(r),s[5].copy(n),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=2e3){let i=this.planes,a=t.elements,r=a[0],n=a[1],s=a[2],o=a[3],l=a[4],h=a[5],u=a[6],d=a[7],c=a[8],p=a[9],m=a[10],_=a[11],v=a[12],f=a[13],g=a[14],x=a[15];if(i[0].setComponents(o-r,d-l,_-c,x-v).normalize(),i[1].setComponents(o+r,d+l,_+c,x+v).normalize(),i[2].setComponents(o+n,d+h,_+p,x+f).normalize(),i[3].setComponents(o-n,d-h,_-p,x-f).normalize(),i[4].setComponents(o-s,d-u,_-m,x-g).normalize(),e===cr)i[5].setComponents(o+s,d+u,_+m,x+g).normalize();else{if(e!==Ba)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);i[5].setComponents(s,u,m,g).normalize()}return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(t){return xi.center.set(0,0,0),xi.radius=.7071067811865476,xi.applyMatrix4(t.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(t){let e=this.planes,i=t.center,a=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let a=e[i];if(ua.x=a.normal.x>0?t.max.x:t.min.x,ua.y=a.normal.y>0?t.max.y:t.min.y,ua.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(ua)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Yl(){let t=null,e=!1,i=null,a=null;function r(n,s){i(n,s),a=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&i!==null&&(a=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(a),e=!1},setAnimationLoop:function(n){i=n},setContext:function(n){t=n}}}function Nu(t,e){let i=e.isWebGL2,a=new WeakMap;return{get:function(r){return r.isInterleavedBufferAttribute&&(r=r.data),a.get(r)},remove:function(r){r.isInterleavedBufferAttribute&&(r=r.data);let n=a.get(r);n&&(t.deleteBuffer(n.buffer),a.delete(r))},update:function(r,n){if(r.isGLBufferAttribute){let o=a.get(r);return void((!o||o.version<r.version)&&a.set(r,{buffer:r.buffer,type:r.type,bytesPerElement:r.elementSize,version:r.version}))}r.isInterleavedBufferAttribute&&(r=r.data);let s=a.get(r);if(s===void 0)a.set(r,(function(o,l){let h=o.array,u=o.usage,d=h.byteLength,c=t.createBuffer(),p;if(t.bindBuffer(l,c),t.bufferData(l,h,u),o.onUploadCallback(),h instanceof Float32Array)p=t.FLOAT;else if(h instanceof Uint16Array)if(o.isFloat16BufferAttribute){if(!i)throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");p=t.HALF_FLOAT}else p=t.UNSIGNED_SHORT;else if(h instanceof Int16Array)p=t.SHORT;else if(h instanceof Uint32Array)p=t.UNSIGNED_INT;else if(h instanceof Int32Array)p=t.INT;else if(h instanceof Int8Array)p=t.BYTE;else if(h instanceof Uint8Array)p=t.UNSIGNED_BYTE;else{if(!(h instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);p=t.UNSIGNED_BYTE}return{buffer:c,type:p,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:d}})(r,n));else if(s.version<r.version){if(s.size!==r.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(o,l,h){let u=l.array,d=l._updateRange,c=l.updateRanges;if(t.bindBuffer(h,o),d.count===-1&&c.length===0&&t.bufferSubData(h,0,u),c.length!==0){for(let p=0,m=c.length;p<m;p++){let _=c[p];i?t.bufferSubData(h,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count):t.bufferSubData(h,_.start*u.BYTES_PER_ELEMENT,u.subarray(_.start,_.start+_.count))}l.clearUpdateRanges()}d.count!==-1&&(i?t.bufferSubData(h,d.offset*u.BYTES_PER_ELEMENT,u,d.offset,d.count):t.bufferSubData(h,d.offset*u.BYTES_PER_ELEMENT,u.subarray(d.offset,d.offset+d.count)),d.count=-1),l.onUploadCallback()})(s.buffer,r,n),s.version=r.version}}}}var Dt=class Zl extends Xe{constructor(e=1,i=1,a=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:a,heightSegments:r};let n=e/2,s=i/2,o=Math.floor(a),l=Math.floor(r),h=o+1,u=l+1,d=e/o,c=i/l,p=[],m=[],_=[],v=[];for(let f=0;f<u;f++){let g=f*c-s;for(let x=0;x<h;x++){let y=x*d-n;m.push(y,-g,0),_.push(0,0,1),v.push(x/o),v.push(1-f/l)}}for(let f=0;f<l;f++)for(let g=0;g<o;g++){let x=g+h*f,y=g+h*(f+1),C=g+1+h*(f+1),T=g+1+h*f;p.push(x,y,T),p.push(y,C,T)}this.setIndex(p),this.setAttribute("position",new Me(m,3)),this.setAttribute("normal",new Me(_,3)),this.setAttribute("uv",new Me(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zl(e.width,e.height,e.widthSegments,e.heightSegments)}},Ee={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_fragment:`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},oe={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ce},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ce}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ce},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0},uvTransform:{value:new Ce}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ce},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0}}},Rt={basic:{uniforms:nt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Ee.meshbasic_vert,fragmentShader:Ee.meshbasic_frag},lambert:{uniforms:nt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ee.meshlambert_vert,fragmentShader:Ee.meshlambert_frag},phong:{uniforms:nt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:Ee.meshphong_vert,fragmentShader:Ee.meshphong_frag},standard:{uniforms:nt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ee.meshphysical_vert,fragmentShader:Ee.meshphysical_frag},toon:{uniforms:nt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ee.meshtoon_vert,fragmentShader:Ee.meshtoon_frag},matcap:{uniforms:nt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Ee.meshmatcap_vert,fragmentShader:Ee.meshmatcap_frag},points:{uniforms:nt([oe.points,oe.fog]),vertexShader:Ee.points_vert,fragmentShader:Ee.points_frag},dashed:{uniforms:nt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ee.linedashed_vert,fragmentShader:Ee.linedashed_frag},depth:{uniforms:nt([oe.common,oe.displacementmap]),vertexShader:Ee.depth_vert,fragmentShader:Ee.depth_frag},normal:{uniforms:nt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Ee.meshnormal_vert,fragmentShader:Ee.meshnormal_frag},sprite:{uniforms:nt([oe.sprite,oe.fog]),vertexShader:Ee.sprite_vert,fragmentShader:Ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ee.background_vert,fragmentShader:Ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ee.backgroundCube_vert,fragmentShader:Ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ee.cube_vert,fragmentShader:Ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ee.equirect_vert,fragmentShader:Ee.equirect_frag},distanceRGBA:{uniforms:nt([oe.common,oe.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ee.distanceRGBA_vert,fragmentShader:Ee.distanceRGBA_frag},shadow:{uniforms:nt([oe.lights,oe.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Ee.shadow_vert,fragmentShader:Ee.shadow_frag}};Rt.physical={uniforms:nt([Rt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ce},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ce},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ce},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ce},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ce},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ce},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ce}}]),vertexShader:Ee.meshphysical_vert,fragmentShader:Ee.meshphysical_frag};var ca={r:0,b:0,g:0};function Uu(t,e,i,a,r,n,s){let o=new Ue(0),l,h,u=n===!0?0:1,d=null,c=0,p=null;function m(_,v){_.getRGB(ca,ql(t)),a.buffers.color.setClear(ca.r,ca.g,ca.b,v,s)}return{getClearColor:function(){return o},setClearColor:function(_,v=1){o.set(_),u=v,m(o,u)},getClearAlpha:function(){return u},setClearAlpha:function(_){u=_,m(o,u)},render:function(_,v){let f=!1,g=v.isScene===!0?v.background:null;g&&g.isTexture&&(g=(v.backgroundBlurriness>0?i:e).get(g)),g===null?m(o,u):g&&g.isColor&&(m(g,1),f=!0);let x=t.xr.getEnvironmentBlendMode();x==="additive"?a.buffers.color.setClear(0,0,0,1,s):x==="alpha-blend"&&a.buffers.color.setClear(0,0,0,0,s),(t.autoClear||f)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),g&&(g.isCubeTexture||g.mapping===ja)?(h===void 0&&(h=new Ze(new Ka(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:dr(Rt.backgroundCube.uniforms),vertexShader:Rt.backgroundCube.vertexShader,fragmentShader:Rt.backgroundCube.fragmentShader,side:lt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(y,C,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=g,h.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.toneMapped=Oe.getTransfer(g.colorSpace)!==ze,d===g&&c===g.version&&p===t.toneMapping||(h.material.needsUpdate=!0,d=g,c=g.version,p=t.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):g&&g.isTexture&&(l===void 0&&(l=new Ze(new Dt(2,2),new oi({name:"BackgroundMaterial",uniforms:dr(Rt.background.uniforms),vertexShader:Rt.background.vertexShader,fragmentShader:Rt.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=g,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Oe.getTransfer(g.colorSpace)!==ze,g.matrixAutoUpdate===!0&&g.updateMatrix(),l.material.uniforms.uvTransform.value.copy(g.matrix),d===g&&c===g.version&&p===t.toneMapping||(l.material.needsUpdate=!0,d=g,c=g.version,p=t.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}}}function Du(t,e,i,a){let r=t.getParameter(t.MAX_VERTEX_ATTRIBS),n=a.isWebGL2?null:e.get("OES_vertex_array_object"),s=a.isWebGL2||n!==null,o={},l=p(null),h=l,u=!1;function d(C){return a.isWebGL2?t.bindVertexArray(C):n.bindVertexArrayOES(C)}function c(C){return a.isWebGL2?t.deleteVertexArray(C):n.deleteVertexArrayOES(C)}function p(C){let T=[],A=[],F=[];for(let L=0;L<r;L++)T[L]=0,A[L]=0,F[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:A,attributeDivisors:F,object:C,attributes:{},index:null}}function m(){let C=h.newAttributes;for(let T=0,A=C.length;T<A;T++)C[T]=0}function _(C){v(C,0)}function v(C,T){let A=h.newAttributes,F=h.enabledAttributes,L=h.attributeDivisors;A[C]=1,F[C]===0&&(t.enableVertexAttribArray(C),F[C]=1),L[C]!==T&&((a.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[a.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,T),L[C]=T)}function f(){let C=h.newAttributes,T=h.enabledAttributes;for(let A=0,F=T.length;A<F;A++)T[A]!==C[A]&&(t.disableVertexAttribArray(A),T[A]=0)}function g(C,T,A,F,L,B,G){G===!0?t.vertexAttribIPointer(C,T,A,L,B):t.vertexAttribPointer(C,T,A,F,L,B)}function x(){y(),u=!0,h!==l&&(h=l,d(h.object))}function y(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:function(C,T,A,F,L){let B=!1;if(s){let G=(function(R,X,W){let ae=W.wireframe===!0,ce=o[R.id];ce===void 0&&(ce={},o[R.id]=ce);let ne=ce[X.id];ne===void 0&&(ne={},ce[X.id]=ne);let q=ne[ae];return q===void 0&&(q=p(a.isWebGL2?t.createVertexArray():n.createVertexArrayOES()),ne[ae]=q),q})(F,A,T);h!==G&&(h=G,d(h.object)),B=(function(R,X,W,ae){let ce=h.attributes,ne=X.attributes,q=0,J=W.getAttributes();for(let z in J)if(J[z].location>=0){let $=ce[z],le=ne[z];if(le===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(le=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(le=R.instanceColor)),$===void 0||$.attribute!==le||le&&$.data!==le.data)return!0;q++}return h.attributesNum!==q||h.index!==ae})(C,F,A,L),B&&(function(R,X,W,ae){let ce={},ne=X.attributes,q=0,J=W.getAttributes();for(let z in J)if(J[z].location>=0){let $=ne[z];$===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&($=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&($=R.instanceColor));let le={};le.attribute=$,$&&$.data&&(le.data=$.data),ce[z]=le,q++}h.attributes=ce,h.attributesNum=q,h.index=ae})(C,F,A,L)}else{let G=T.wireframe===!0;h.geometry===F.id&&h.program===A.id&&h.wireframe===G||(h.geometry=F.id,h.program=A.id,h.wireframe=G,B=!0)}L!==null&&i.update(L,t.ELEMENT_ARRAY_BUFFER),(B||u)&&(u=!1,(function(G,R,X,W){if(a.isWebGL2===!1&&(G.isInstancedMesh||W.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;m();let ae=W.attributes,ce=X.getAttributes(),ne=R.defaultAttributeValues;for(let q in ce){let J=ce[q];if(J.location>=0){let z=ae[q];if(z===void 0&&(q==="instanceMatrix"&&G.instanceMatrix&&(z=G.instanceMatrix),q==="instanceColor"&&G.instanceColor&&(z=G.instanceColor)),z!==void 0){let $=z.normalized,le=z.itemSize,M=i.get(z);if(M===void 0)continue;let S=M.buffer,N=M.type,te=M.bytesPerElement,P=a.isWebGL2===!0&&(N===t.INT||N===t.UNSIGNED_INT||z.gpuType===Ml);if(z.isInterleavedBufferAttribute){let O=z.data,U=O.stride,D=z.offset;if(O.isInstancedInterleavedBuffer){for(let I=0;I<J.locationSize;I++)v(J.location+I,O.meshPerAttribute);G.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let I=0;I<J.locationSize;I++)_(J.location+I);t.bindBuffer(t.ARRAY_BUFFER,S);for(let I=0;I<J.locationSize;I++)g(J.location+I,le/J.locationSize,N,$,U*te,(D+le/J.locationSize*I)*te,P)}else{if(z.isInstancedBufferAttribute){for(let O=0;O<J.locationSize;O++)v(J.location+O,z.meshPerAttribute);G.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let O=0;O<J.locationSize;O++)_(J.location+O);t.bindBuffer(t.ARRAY_BUFFER,S);for(let O=0;O<J.locationSize;O++)g(J.location+O,le/J.locationSize,N,$,le*te,le/J.locationSize*O*te,P)}}else if(ne!==void 0){let $=ne[q];if($!==void 0)switch($.length){case 2:t.vertexAttrib2fv(J.location,$);break;case 3:t.vertexAttrib3fv(J.location,$);break;case 4:t.vertexAttrib4fv(J.location,$);break;default:t.vertexAttrib1fv(J.location,$)}}}}f()})(C,T,A,F),L!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,i.get(L).buffer))},reset:x,resetDefaultState:y,dispose:function(){x();for(let C in o){let T=o[C];for(let A in T){let F=T[A];for(let L in F)c(F[L].object),delete F[L];delete T[A]}delete o[C]}},releaseStatesOfGeometry:function(C){if(o[C.id]===void 0)return;let T=o[C.id];for(let A in T){let F=T[A];for(let L in F)c(F[L].object),delete F[L];delete T[A]}delete o[C.id]},releaseStatesOfProgram:function(C){for(let T in o){let A=o[T];if(A[C.id]===void 0)continue;let F=A[C.id];for(let L in F)c(F[L].object),delete F[L];delete A[C.id]}},initAttributes:m,enableAttribute:_,disableUnusedAttributes:f}}function Iu(t,e,i,a){let r=a.isWebGL2,n;this.setMode=function(s){n=s},this.render=function(s,o){t.drawArrays(n,s,o),i.update(o,n,1)},this.renderInstances=function(s,o,l){if(l===0)return;let h,u;if(r)h=t,u="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),u="drawArraysInstancedANGLE",h===null)return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");h[u](n,s,o,l),i.update(o,n,l)},this.renderMultiDraw=function(s,o,l){if(l===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let u=0;u<l;u++)this.render(s[u],o[u]);else{h.multiDrawArraysWEBGL(n,s,0,o,0,l);let u=0;for(let d=0;d<l;d++)u+=o[d];i.update(u,n,1)}}}function Ou(t,e,i){let a;function r(y){if(y==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let n=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext",s=i.precision!==void 0?i.precision:"highp",o=r(s);o!==s&&(console.warn("THREE.WebGLRenderer:",s,"not supported, using",o,"instead."),s=o);let l=n||e.has("WEBGL_draw_buffers"),h=i.logarithmicDepthBuffer===!0,u=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),d=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),c=t.getParameter(t.MAX_TEXTURE_SIZE),p=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),m=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),f=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),g=d>0,x=n||e.has("OES_texture_float");return{isWebGL2:n,drawBuffers:l,getMaxAnisotropy:function(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a},getMaxPrecision:r,precision:s,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:c,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:f,vertexTextures:g,floatFragmentTextures:x,floatVertexTextures:g&&x,maxSamples:n?t.getParameter(t.MAX_SAMPLES):0}}function Fu(t){let e=this,i=null,a=0,r=!1,n=!1,s=new yi,o=new Ce,l={value:null,needsUpdate:!1};function h(u,d,c,p){let m=u!==null?u.length:0,_=null;if(m!==0){if(_=l.value,p!==!0||_===null){let v=c+4*m,f=d.matrixWorldInverse;o.getNormalMatrix(f),(_===null||_.length<v)&&(_=new Float32Array(v));for(let g=0,x=c;g!==m;++g,x+=4)s.copy(u[g]).applyMatrix4(f,o),s.normal.toArray(_,x),_[x+3]=s.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,_}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let c=u.length!==0||d||a!==0||r;return r=d,a=u.length,c},this.beginShadows=function(){n=!0,h(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(u,d){i=h(u,d,0)},this.setState=function(u,d,c){let p=u.clippingPlanes,m=u.clipIntersection,_=u.clipShadows,v=t.get(u);if(!r||p===null||p.length===0||n&&!_)n?h(null):(function(){l.value!==i&&(l.value=i,l.needsUpdate=a>0),e.numPlanes=a,e.numIntersection=0})();else{let f=n?0:a,g=4*f,x=v.clippingState||null;l.value=x,x=h(p,d,g,c);for(let y=0;y!==g;++y)x[y]=i[y];v.clippingState=x,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=f}}}function zu(t){let e=new WeakMap;function i(r,n){return n===qn?r.mapping=lr:n===jn&&(r.mapping=hr),r}function a(r){let n=r.target;n.removeEventListener("dispose",a);let s=e.get(n);s!==void 0&&(e.delete(n),s.dispose())}return{get:function(r){if(r&&r.isTexture){let n=r.mapping;if(n===qn||n===jn){if(e.has(r))return i(e.get(r).texture,r.mapping);{let s=r.image;if(s&&s.height>0){let o=new Cu(s.height);return o.fromEquirectangularTexture(t,r),e.set(r,o),r.addEventListener("dispose",a),i(o.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}var Bu=class extends cs{constructor(t=-1,e=1,i=1,a=-1,r=.1,n=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=a,this.near=r,this.far=n,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,a,r,n){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2,r=i-t,n=i+t,s=a+e,o=a-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,n=r+l*this.view.width,s-=h*this.view.offsetY,o=s-h*this.view.height}this.projectionMatrix.makeOrthographic(r,n,s,o,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},No=[.125,.215,.35,.446,.526,.582],Tr=20,Pn=new Bu,Uo=new Ue,Ln=null,Nn=0,Un=0,Si=(1+Math.sqrt(5))/2,ji=1/Si,Do=[new w(1,1,1),new w(-1,1,1),new w(1,1,-1),new w(-1,1,-1),new w(0,Si,ji),new w(0,Si,-ji),new w(ji,0,Si),new w(-ji,0,Si),new w(Si,ji,0),new w(-Si,ji,0)],Io=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,a=100){Ln=this._renderer.getRenderTarget(),Nn=this._renderer.getActiveCubeFace(),Un=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,a,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ln,Nn,Un),t.scissorTest=!1,da(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===lr||t.mapping===hr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ln=this._renderer.getRenderTarget(),Nn=this._renderer.getActiveCubeFace(),Un=this._renderer.getActiveMipmapLevel();let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:dt,minFilter:dt,generateMipmaps:!1,type:Ir,format:Lt,colorSpace:Zt,depthBuffer:!1},a=Oo(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oo(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(n){let s=[],o=[],l=[],h=n,u=n-4+1+No.length;for(let d=0;d<u;d++){let c=Math.pow(2,h);o.push(c);let p=1/c;d>n-4?p=No[d-n+4-1]:d===0&&(p=0),l.push(p);let m=1/(c-2),_=-m,v=1+m,f=[_,_,v,_,v,v,_,_,v,v,_,v],g=6,x=6,y=3,C=2,T=1,A=new Float32Array(y*x*g),F=new Float32Array(C*x*g),L=new Float32Array(T*x*g);for(let G=0;G<g;G++){let R=G%3*2/3-1,X=G>2?0:-1,W=[R,X,0,R+2/3,X,0,R+2/3,X+1,0,R,X,0,R+2/3,X+1,0,R,X+1,0];A.set(W,y*x*G),F.set(f,C*x*G);let ae=[G,G,G,G,G,G];L.set(ae,T*x*G)}let B=new Xe;B.setAttribute("position",new vt(A,y)),B.setAttribute("uv",new vt(F,C)),B.setAttribute("faceIndex",new vt(L,T)),s.push(B),h>4&&h--}return{lodPlanes:s,sizeLods:o,sigmas:l}})(r)),this._blurMaterial=(function(n,s,o){let l=new Float32Array(Tr),h=new w(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:Tr,CUBEUV_TEXEL_WIDTH:1/s,CUBEUV_TEXEL_HEIGHT:1/o,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:ps(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})})(r,t,e)}return a}_compileMaterial(t){let e=new Ze(this._lodPlanes[0],t);this._renderer.compile(e,Pn)}_sceneToCubeUV(t,e,i,a){let r=new gt(90,1,e,i),n=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],o=this._renderer,l=o.autoClear,h=o.toneMapping;o.getClearColor(Uo),o.toneMapping=jt,o.autoClear=!1;let u=new si({name:"PMREM.Background",side:lt,depthWrite:!1,depthTest:!1}),d=new Ze(new Ka,u),c=!1,p=t.background;p?p.isColor&&(u.color.copy(p),t.background=null,c=!0):(u.color.copy(Uo),c=!0);for(let m=0;m<6;m++){let _=m%3;_===0?(r.up.set(0,n[m],0),r.lookAt(s[m],0,0)):_===1?(r.up.set(0,0,n[m]),r.lookAt(0,s[m],0)):(r.up.set(0,n[m],0),r.lookAt(0,0,s[m]));let v=this._cubeSize;da(a,_*v,m>2?v:0,v,v),o.setRenderTarget(a),c&&o.render(d,r),o.render(t,r)}d.geometry.dispose(),d.material.dispose(),o.toneMapping=h,o.autoClear=l,t.background=p}_textureToCubeUV(t,e){let i=this._renderer,a=t.mapping===lr||t.mapping===hr;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=zo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fo());let r=a?this._cubemapMaterial:this._equirectMaterial,n=new Ze(this._lodPlanes[0],r);r.uniforms.envMap.value=t;let s=this._cubeSize;da(e,0,0,3*s,2*s),i.setRenderTarget(e),i.render(n,Pn)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let a=1;a<this._lodPlanes.length;a++){let r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),n=Do[(a-1)%Do.length];this._blur(t,a-1,a,r,n)}e.autoClear=i}_blur(t,e,i,a,r){let n=this._pingPongRenderTarget;this._halfBlur(t,n,e,i,a,"latitudinal",r),this._halfBlur(n,t,i,i,a,"longitudinal",r)}_halfBlur(t,e,i,a,r,n,s){let o=this._renderer,l=this._blurMaterial;n!=="latitudinal"&&n!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new Ze(this._lodPlanes[a],l),u=l.uniforms,d=this._sizeLods[i]-1,c=isFinite(r)?Math.PI/(2*d):2*Math.PI/39,p=r/c,m=isFinite(r)?1+Math.floor(3*p):Tr;m>Tr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);let _=[],v=0;for(let x=0;x<Tr;++x){let y=x/p,C=Math.exp(-y*y/2);_.push(C),x===0?v+=C:x<m&&(v+=2*C)}for(let x=0;x<_.length;x++)_[x]=_[x]/v;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=_,u.latitudinal.value=n==="latitudinal",s&&(u.poleAxis.value=s);let{_lodMax:f}=this;u.dTheta.value=c,u.mipInt.value=f-i;let g=this._sizeLods[a];da(e,3*g*(a>f-4?a-f+4:0),4*(this._cubeSize-g),3*g,2*g),o.setRenderTarget(e),o.render(h,Pn)}};function Oo(t,e,i){let a=new Ci(t,e,i);return a.texture.mapping=ja,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function da(t,e,i,a,r){t.viewport.set(e,i,a,r),t.scissor.set(e,i,a,r)}function Fo(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ps(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function zo(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ps(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ps(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Hu(t){let e=new WeakMap,i=null;function a(r){let n=r.target;n.removeEventListener("dispose",a);let s=e.get(n);s!==void 0&&(e.delete(n),s.dispose())}return{get:function(r){if(r&&r.isTexture){let n=r.mapping,s=n===qn||n===jn,o=n===lr||n===hr;if(s||o){if(r.isRenderTargetTexture&&r.needsPMREMUpdate===!0){r.needsPMREMUpdate=!1;let l=e.get(r);return i===null&&(i=new Io(t)),l=s?i.fromEquirectangular(r,l):i.fromCubemap(r,l),e.set(r,l),l.texture}if(e.has(r))return e.get(r).texture;{let l=r.image;if(s&&l&&l.height>0||o&&l&&(function(h){let u=0,d=6;for(let c=0;c<d;c++)h[c]!==void 0&&u++;return u===d})(l)){i===null&&(i=new Io(t));let h=s?i.fromEquirectangular(r):i.fromCubemap(r);return e.set(r,h),r.addEventListener("dispose",a),h.texture}return null}}}return r},dispose:function(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}}}function Gu(t){let e={};function i(a){if(e[a]!==void 0)return e[a];let r;switch(a){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(a)}return e[a]=r,r}return{has:function(a){return i(a)!==null},init:function(a){a.isWebGL2?(i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance")):(i("WEBGL_depth_texture"),i("OES_texture_float"),i("OES_texture_half_float"),i("OES_texture_half_float_linear"),i("OES_standard_derivatives"),i("OES_element_index_uint"),i("OES_vertex_array_object"),i("ANGLE_instanced_arrays")),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture")},get:function(a){let r=i(a);return r===null&&console.warn("THREE.WebGLRenderer: "+a+" extension not supported."),r}}}function Vu(t,e,i,a){let r={},n=new WeakMap;function s(l){let h=l.target;h.index!==null&&e.remove(h.index);for(let d in h.attributes)e.remove(h.attributes[d]);for(let d in h.morphAttributes){let c=h.morphAttributes[d];for(let p=0,m=c.length;p<m;p++)e.remove(c[p])}h.removeEventListener("dispose",s),delete r[h.id];let u=n.get(h);u&&(e.remove(u),n.delete(h)),a.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,i.memory.geometries--}function o(l){let h=[],u=l.index,d=l.attributes.position,c=0;if(u!==null){let _=u.array;c=u.version;for(let v=0,f=_.length;v<f;v+=3){let g=_[v+0],x=_[v+1],y=_[v+2];h.push(g,x,x,y,y,g)}}else{if(d===void 0)return;{let _=d.array;c=d.version;for(let v=0,f=_.length/3-1;v<f;v+=3){let g=v+0,x=v+1,y=v+2;h.push(g,x,x,y,y,g)}}}let p=new(Nl(h)?kl:Vl)(h,1);p.version=c;let m=n.get(l);m&&e.remove(m),n.set(l,p)}return{get:function(l,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,i.memory.geometries++),h},update:function(l){let h=l.attributes;for(let d in h)e.update(h[d],t.ARRAY_BUFFER);let u=l.morphAttributes;for(let d in u){let c=u[d];for(let p=0,m=c.length;p<m;p++)e.update(c[p],t.ARRAY_BUFFER)}},getWireframeAttribute:function(l){let h=n.get(l);if(h){let u=l.index;u!==null&&h.version<u.version&&o(l)}else o(l);return n.get(l)}}}function ku(t,e,i,a){let r=a.isWebGL2,n,s,o;this.setMode=function(l){n=l},this.setIndex=function(l){s=l.type,o=l.bytesPerElement},this.render=function(l,h){t.drawElements(n,h,s,l*o),i.update(h,n,1)},this.renderInstances=function(l,h,u){if(u===0)return;let d,c;if(r)d=t,c="drawElementsInstanced";else if(d=e.get("ANGLE_instanced_arrays"),c="drawElementsInstancedANGLE",d===null)return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");d[c](n,h,s,l*o,u),i.update(h,n,u)},this.renderMultiDraw=function(l,h,u){if(u===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let c=0;c<u;c++)this.render(l[c]/o,h[c]);else{d.multiDrawElementsWEBGL(n,h,0,s,l,0,u);let c=0;for(let p=0;p<u;p++)c+=h[p];i.update(c,n,1)}}}function Wu(t){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(i,a,r){switch(e.calls++,a){case t.TRIANGLES:e.triangles+=r*(i/3);break;case t.LINES:e.lines+=r*(i/2);break;case t.LINE_STRIP:e.lines+=r*(i-1);break;case t.LINE_LOOP:e.lines+=r*i;break;case t.POINTS:e.points+=r*i;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a)}}}}function Xu(t,e){return t[0]-e[0]}function qu(t,e){return Math.abs(e[1])-Math.abs(t[1])}function ju(t,e,i){let a={},r=new Float32Array(8),n=new WeakMap,s=new et,o=[];for(let l=0;l<8;l++)o[l]=[l,0];return{update:function(l,h,u){let d=l.morphTargetInfluences;if(e.isWebGL2===!0){let c=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,p=c!==void 0?c.length:0,m=n.get(h);if(m===void 0||m.count!==p){let f=function(){R.dispose(),n.delete(h),h.removeEventListener("dispose",f)};m!==void 0&&m.texture.dispose();let g=h.morphAttributes.position!==void 0,x=h.morphAttributes.normal!==void 0,y=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],T=h.morphAttributes.normal||[],A=h.morphAttributes.color||[],F=0;g===!0&&(F=1),x===!0&&(F=2),y===!0&&(F=3);let L=h.attributes.position.count*F,B=1;L>e.maxTextureSize&&(B=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);let G=new Float32Array(L*B*4*p),R=new Ol(G,L,B,p);R.type=Xt,R.needsUpdate=!0;let X=4*F;for(let W=0;W<p;W++){let ae=C[W],ce=T[W],ne=A[W],q=L*B*4*W;for(let J=0;J<ae.count;J++){let z=J*X;g===!0&&(s.fromBufferAttribute(ae,J),G[q+z+0]=s.x,G[q+z+1]=s.y,G[q+z+2]=s.z,G[q+z+3]=0),x===!0&&(s.fromBufferAttribute(ce,J),G[q+z+4]=s.x,G[q+z+5]=s.y,G[q+z+6]=s.z,G[q+z+7]=0),y===!0&&(s.fromBufferAttribute(ne,J),G[q+z+8]=s.x,G[q+z+9]=s.y,G[q+z+10]=s.z,G[q+z+11]=ne.itemSize===4?s.w:1)}}m={count:p,texture:R,size:new se(L,B)},n.set(h,m),h.addEventListener("dispose",f)}let _=0;for(let f=0;f<d.length;f++)_+=d[f];let v=h.morphTargetsRelative?1:1-_;u.getUniforms().setValue(t,"morphTargetBaseInfluence",v),u.getUniforms().setValue(t,"morphTargetInfluences",d),u.getUniforms().setValue(t,"morphTargetsTexture",m.texture,i),u.getUniforms().setValue(t,"morphTargetsTextureSize",m.size)}else{let c=d===void 0?0:d.length,p=a[h.id];if(p===void 0||p.length!==c){p=[];for(let g=0;g<c;g++)p[g]=[g,0];a[h.id]=p}for(let g=0;g<c;g++){let x=p[g];x[0]=g,x[1]=d[g]}p.sort(qu);for(let g=0;g<8;g++)g<c&&p[g][1]?(o[g][0]=p[g][0],o[g][1]=p[g][1]):(o[g][0]=Number.MAX_SAFE_INTEGER,o[g][1]=0);o.sort(Xu);let m=h.morphAttributes.position,_=h.morphAttributes.normal,v=0;for(let g=0;g<8;g++){let x=o[g],y=x[0],C=x[1];y!==Number.MAX_SAFE_INTEGER&&C?(m&&h.getAttribute("morphTarget"+g)!==m[y]&&h.setAttribute("morphTarget"+g,m[y]),_&&h.getAttribute("morphNormal"+g)!==_[y]&&h.setAttribute("morphNormal"+g,_[y]),r[g]=C,v+=C):(m&&h.hasAttribute("morphTarget"+g)===!0&&h.deleteAttribute("morphTarget"+g),_&&h.hasAttribute("morphNormal"+g)===!0&&h.deleteAttribute("morphNormal"+g),r[g]=0)}let f=h.morphTargetsRelative?1:1-v;u.getUniforms().setValue(t,"morphTargetBaseInfluence",f),u.getUniforms().setValue(t,"morphTargetInfluences",r)}}}}function Yu(t,e,i,a){let r=new WeakMap;function n(s){let o=s.target;o.removeEventListener("dispose",n),i.remove(o.instanceMatrix),o.instanceColor!==null&&i.remove(o.instanceColor)}return{update:function(s){let o=a.render.frame,l=s.geometry,h=e.get(s,l);if(r.get(h)!==o&&(e.update(h),r.set(h,o)),s.isInstancedMesh&&(s.hasEventListener("dispose",n)===!1&&s.addEventListener("dispose",n),r.get(s)!==o&&(i.update(s.instanceMatrix,t.ARRAY_BUFFER),s.instanceColor!==null&&i.update(s.instanceColor,t.ARRAY_BUFFER),r.set(s,o))),s.isSkinnedMesh){let u=s.skeleton;r.get(u)!==o&&(u.update(),r.set(u,o))}return h},dispose:function(){r=new WeakMap}}}var Kl=class extends _t{constructor(t,e,i,a,r,n,s,o,l,h){if((h=h!==void 0?h:wi)!==wi&&h!==ur)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===wi&&(i=ri),i===void 0&&h===ur&&(i=bi),super(null,a,r,n,s,o,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=s!==void 0?s:st,this.minFilter=o!==void 0?o:st,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Jl=new _t,$l=new Kl(1,1);$l.compareFunction=515;var Ql=new Ol,eh=new mu,th=new jl,Bo=[],Ho=[],Go=new Float32Array(16),Vo=new Float32Array(9),ko=new Float32Array(4);function fr(t,e,i){let a=t[0];if(a<=0||a>0)return t;let r=e*i,n=Bo[r];if(n===void 0&&(n=new Float32Array(r),Bo[r]=n),e!==0){a.toArray(n,0);for(let s=1,o=0;s!==e;++s)o+=i,t[s].toArray(n,o)}return n}function Ke(t,e){if(t.length!==e.length)return!1;for(let i=0,a=t.length;i<a;i++)if(t[i]!==e[i])return!1;return!0}function Je(t,e){for(let i=0,a=e.length;i<a;i++)t[i]=e[i]}function Ja(t,e){let i=Ho[e];i===void 0&&(i=new Int32Array(e),Ho[e]=i);for(let a=0;a!==e;++a)i[a]=t.allocateTextureUnit();return i}function Zu(t,e){let i=this.cache;i[0]!==e&&(t.uniform1f(this.addr,e),i[0]=e)}function Ku(t,e){let i=this.cache;if(e.x!==void 0)i[0]===e.x&&i[1]===e.y||(t.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Ke(i,e))return;t.uniform2fv(this.addr,e),Je(i,e)}}function Ju(t,e){let i=this.cache;if(e.x!==void 0)i[0]===e.x&&i[1]===e.y&&i[2]===e.z||(t.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)i[0]===e.r&&i[1]===e.g&&i[2]===e.b||(t.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(Ke(i,e))return;t.uniform3fv(this.addr,e),Je(i,e)}}function $u(t,e){let i=this.cache;if(e.x!==void 0)i[0]===e.x&&i[1]===e.y&&i[2]===e.z&&i[3]===e.w||(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Ke(i,e))return;t.uniform4fv(this.addr,e),Je(i,e)}}function Qu(t,e){let i=this.cache,a=e.elements;if(a===void 0){if(Ke(i,e))return;t.uniformMatrix2fv(this.addr,!1,e),Je(i,e)}else{if(Ke(i,a))return;ko.set(a),t.uniformMatrix2fv(this.addr,!1,ko),Je(i,a)}}function ec(t,e){let i=this.cache,a=e.elements;if(a===void 0){if(Ke(i,e))return;t.uniformMatrix3fv(this.addr,!1,e),Je(i,e)}else{if(Ke(i,a))return;Vo.set(a),t.uniformMatrix3fv(this.addr,!1,Vo),Je(i,a)}}function tc(t,e){let i=this.cache,a=e.elements;if(a===void 0){if(Ke(i,e))return;t.uniformMatrix4fv(this.addr,!1,e),Je(i,e)}else{if(Ke(i,a))return;Go.set(a),t.uniformMatrix4fv(this.addr,!1,Go),Je(i,a)}}function ic(t,e){let i=this.cache;i[0]!==e&&(t.uniform1i(this.addr,e),i[0]=e)}function rc(t,e){let i=this.cache;if(e.x!==void 0)i[0]===e.x&&i[1]===e.y||(t.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Ke(i,e))return;t.uniform2iv(this.addr,e),Je(i,e)}}function ac(t,e){let i=this.cache;if(e.x!==void 0)i[0]===e.x&&i[1]===e.y&&i[2]===e.z||(t.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Ke(i,e))return;t.uniform3iv(this.addr,e),Je(i,e)}}function nc(t,e){let i=this.cache;if(e.x!==void 0)i[0]===e.x&&i[1]===e.y&&i[2]===e.z&&i[3]===e.w||(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Ke(i,e))return;t.uniform4iv(this.addr,e),Je(i,e)}}function sc(t,e){let i=this.cache;i[0]!==e&&(t.uniform1ui(this.addr,e),i[0]=e)}function oc(t,e){let i=this.cache;if(e.x!==void 0)i[0]===e.x&&i[1]===e.y||(t.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Ke(i,e))return;t.uniform2uiv(this.addr,e),Je(i,e)}}function lc(t,e){let i=this.cache;if(e.x!==void 0)i[0]===e.x&&i[1]===e.y&&i[2]===e.z||(t.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Ke(i,e))return;t.uniform3uiv(this.addr,e),Je(i,e)}}function hc(t,e){let i=this.cache;if(e.x!==void 0)i[0]===e.x&&i[1]===e.y&&i[2]===e.z&&i[3]===e.w||(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Ke(i,e))return;t.uniform4uiv(this.addr,e),Je(i,e)}}function uc(t,e,i){let a=this.cache,r=i.allocateTextureUnit();a[0]!==r&&(t.uniform1i(this.addr,r),a[0]=r);let n=this.type===t.SAMPLER_2D_SHADOW?$l:Jl;i.setTexture2D(e||n,r)}function cc(t,e,i){let a=this.cache,r=i.allocateTextureUnit();a[0]!==r&&(t.uniform1i(this.addr,r),a[0]=r),i.setTexture3D(e||eh,r)}function dc(t,e,i){let a=this.cache,r=i.allocateTextureUnit();a[0]!==r&&(t.uniform1i(this.addr,r),a[0]=r),i.setTextureCube(e||th,r)}function pc(t,e,i){let a=this.cache,r=i.allocateTextureUnit();a[0]!==r&&(t.uniform1i(this.addr,r),a[0]=r),i.setTexture2DArray(e||Ql,r)}function fc(t,e){t.uniform1fv(this.addr,e)}function mc(t,e){let i=fr(e,this.size,2);t.uniform2fv(this.addr,i)}function gc(t,e){let i=fr(e,this.size,3);t.uniform3fv(this.addr,i)}function _c(t,e){let i=fr(e,this.size,4);t.uniform4fv(this.addr,i)}function vc(t,e){let i=fr(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,i)}function xc(t,e){let i=fr(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,i)}function yc(t,e){let i=fr(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,i)}function Sc(t,e){t.uniform1iv(this.addr,e)}function Mc(t,e){t.uniform2iv(this.addr,e)}function Ec(t,e){t.uniform3iv(this.addr,e)}function Tc(t,e){t.uniform4iv(this.addr,e)}function bc(t,e){t.uniform1uiv(this.addr,e)}function wc(t,e){t.uniform2uiv(this.addr,e)}function Ac(t,e){t.uniform3uiv(this.addr,e)}function Rc(t,e){t.uniform4uiv(this.addr,e)}function Cc(t,e,i){let a=this.cache,r=e.length,n=Ja(i,r);Ke(a,n)||(t.uniform1iv(this.addr,n),Je(a,n));for(let s=0;s!==r;++s)i.setTexture2D(e[s]||Jl,n[s])}function Pc(t,e,i){let a=this.cache,r=e.length,n=Ja(i,r);Ke(a,n)||(t.uniform1iv(this.addr,n),Je(a,n));for(let s=0;s!==r;++s)i.setTexture3D(e[s]||eh,n[s])}function Lc(t,e,i){let a=this.cache,r=e.length,n=Ja(i,r);Ke(a,n)||(t.uniform1iv(this.addr,n),Je(a,n));for(let s=0;s!==r;++s)i.setTextureCube(e[s]||th,n[s])}function Nc(t,e,i){let a=this.cache,r=e.length,n=Ja(i,r);Ke(a,n)||(t.uniform1iv(this.addr,n),Je(a,n));for(let s=0;s!==r;++s)i.setTexture2DArray(e[s]||Ql,n[s])}var Uc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=(function(a){switch(a){case 5126:return Zu;case 35664:return Ku;case 35665:return Ju;case 35666:return $u;case 35674:return Qu;case 35675:return ec;case 35676:return tc;case 5124:case 35670:return ic;case 35667:case 35671:return rc;case 35668:case 35672:return ac;case 35669:case 35673:return nc;case 5125:return sc;case 36294:return oc;case 36295:return lc;case 36296:return hc;case 35678:case 36198:case 36298:case 36306:case 35682:return uc;case 35679:case 36299:case 36307:return cc;case 35680:case 36300:case 36308:case 36293:return dc;case 36289:case 36303:case 36311:case 36292:return pc}})(e.type)}},Dc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=(function(a){switch(a){case 5126:return fc;case 35664:return mc;case 35665:return gc;case 35666:return _c;case 35674:return vc;case 35675:return xc;case 35676:return yc;case 5124:case 35670:return Sc;case 35667:case 35671:return Mc;case 35668:case 35672:return Ec;case 35669:case 35673:return Tc;case 5125:return bc;case 36294:return wc;case 36295:return Ac;case 36296:return Rc;case 35678:case 36198:case 36298:case 36306:case 35682:return Cc;case 35679:case 36299:case 36307:return Pc;case 35680:case 36300:case 36308:case 36293:return Lc;case 36289:case 36303:case 36311:case 36292:return Nc}})(e.type)}},Ic=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let a=this.seq;for(let r=0,n=a.length;r!==n;++r){let s=a[r];s.setValue(t,e[s.id],i)}}},Dn=/(\w+)(\])?(\[|\.)?/g;function Wo(t,e){t.seq.push(e),t.map[e.id]=e}function Oc(t,e,i){let a=t.name,r=a.length;for(Dn.lastIndex=0;;){let n=Dn.exec(a),s=Dn.lastIndex,o=n[1],l=n[2]==="]",h=n[3];if(l&&(o|=0),h===void 0||h==="["&&s+2===r){Wo(i,h===void 0?new Uc(o,t,e):new Dc(o,t,e));break}{let u=i.map[o];u===void 0&&(u=new Ic(o),Wo(i,u)),i=u}}}var Ra=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let r=t.getActiveUniform(e,a);Oc(r,t.getUniformLocation(e,r.name),this)}}setValue(t,e,i,a){let r=this.map[e];r!==void 0&&r.setValue(t,i,a)}setOptional(t,e,i){let a=e[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,e,i,a){for(let r=0,n=e.length;r!==n;++r){let s=e[r],o=i[s.id];o.needsUpdate!==!1&&s.setValue(t,o.value,a)}}static seqWithValue(t,e){let i=[];for(let a=0,r=t.length;a!==r;++a){let n=t[a];n.id in e&&i.push(n)}return i}};function Xo(t,e,i){let a=t.createShader(e);return t.shaderSource(a,i),t.compileShader(a),a}var Fc=37297,zc=0;function qo(t,e,i){let a=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(a&&r==="")return"";let n=/ERROR: 0:(\d+)/.exec(r);if(n){let s=parseInt(n[1]);return i.toUpperCase()+`

`+r+`

`+(function(o,l){let h=o.split(`
`),u=[],d=Math.max(l-6,0),c=Math.min(l+6,h.length);for(let p=d;p<c;p++){let m=p+1;u.push(`${m===l?">":" "} ${m}: ${h[p]}`)}return u.join(`
`)})(t.getShaderSource(e),s)}return r}function Bc(t,e){let i=(function(a){let r=Oe.getPrimaries(Oe.workingColorSpace),n=Oe.getPrimaries(a),s;switch(r===n?s="":r===za&&n===Fa?s="LinearDisplayP3ToLinearSRGB":r===Fa&&n===za&&(s="LinearSRGBToLinearDisplayP3"),a){case Zt:case Ya:return[s,"LinearTransferOETF"];case je:case us:return[s,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",a),[s,"LinearTransferOETF"]}})(e);return`vec4 ${t}( vec4 value ) { return ${i[0]}( ${i[1]}( value ) ); }`}function Hc(t,e){let i;switch(e){case ru:i="Linear";break;case au:i="Reinhard";break;case nu:i="OptimizedCineon";break;case su:i="ACESFilmic";break;case lu:i="AgX";break;case ou:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+t+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}function Yi(t){return t!==""}function jo(t,e){let i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yo(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Gc=/^[ \t]*#include +<([\w\d./]+)>/gm;function es(t){return t.replace(Gc,kc)}var Vc=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function kc(t,e){let i=Ee[e];if(i===void 0){let a=Vc.get(e);if(a===void 0)throw new Error("Can not resolve #include <"+e+">");i=Ee[a],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,a)}return es(i)}var Wc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zo(t){return t.replace(Wc,Xc)}function Xc(t,e,i,a){let r="";for(let n=parseInt(e);n<parseInt(i);n++)r+=a.replace(/\[\s*i\s*\]/g,"[ "+n+" ]").replace(/UNROLLED_LOOP_INDEX/g,n);return r}function Ko(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	`;return t.isWebGL2&&(e+=`precision ${t.precision} sampler3D;
		precision ${t.precision} sampler2DArray;
		precision ${t.precision} sampler2DShadow;
		precision ${t.precision} samplerCubeShadow;
		precision ${t.precision} sampler2DArrayShadow;
		precision ${t.precision} isampler2D;
		precision ${t.precision} isampler3D;
		precision ${t.precision} isamplerCube;
		precision ${t.precision} isampler2DArray;
		precision ${t.precision} usampler2D;
		precision ${t.precision} usampler3D;
		precision ${t.precision} usamplerCube;
		precision ${t.precision} usampler2DArray;
		`),t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qc(t,e,i,a){let r=t.getContext(),n=i.defines,s=i.vertexShader,o=i.fragmentShader,l=(function(R){let X="SHADOWMAP_TYPE_BASIC";return R.shadowMapType===xl?X="SHADOWMAP_TYPE_PCF":R.shadowMapType===Qh?X="SHADOWMAP_TYPE_PCF_SOFT":R.shadowMapType===Vt&&(X="SHADOWMAP_TYPE_VSM"),X})(i),h=(function(R){let X="ENVMAP_TYPE_CUBE";if(R.envMap)switch(R.envMapMode){case lr:case hr:X="ENVMAP_TYPE_CUBE";break;case ja:X="ENVMAP_TYPE_CUBE_UV"}return X})(i),u=(function(R){let X="ENVMAP_MODE_REFLECTION";return R.envMap&&R.envMapMode===hr&&(X="ENVMAP_MODE_REFRACTION"),X})(i),d=(function(R){let X="ENVMAP_BLENDING_NONE";if(R.envMap)switch(R.combine){case yl:X="ENVMAP_BLENDING_MULTIPLY";break;case tu:X="ENVMAP_BLENDING_MIX";break;case iu:X="ENVMAP_BLENDING_ADD"}return X})(i),c=(function(R){let X=R.envMapCubeUVHeight;if(X===null)return null;let W=Math.log2(X)-2,ae=1/X;return{texelWidth:1/(3*Math.max(Math.pow(2,W),112)),texelHeight:ae,maxMip:W}})(i),p=i.isWebGL2?"":(function(R){return[R.extensionDerivatives||R.envMapCubeUVHeight||R.bumpMap||R.normalMapTangentSpace||R.clearcoatNormalMap||R.flatShading||R.alphaToCoverage||R.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(R.extensionFragDepth||R.logarithmicDepthBuffer)&&R.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",R.extensionDrawBuffers&&R.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(R.extensionShaderTextureLOD||R.envMap||R.transmission)&&R.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Yi).join(`
`)})(i),m=(function(R){return[R.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",R.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yi).join(`
`)})(i),_=(function(R){let X=[];for(let W in R){let ae=R[W];ae!==!1&&X.push("#define "+W+" "+ae)}return X.join(`
`)})(n),v=r.createProgram(),f,g,x=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(f=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,_].filter(Yi).join(`
`),f.length>0&&(f+=`
`),g=[p,"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,_].filter(Yi).join(`
`),g.length>0&&(g+=`
`)):(f=[Ko(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,_,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+u:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors&&i.isWebGL2?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0&&i.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",i.morphTargetsCount>0&&i.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0&&i.isWebGL2?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+l:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.useLegacyLights?"#define LEGACY_LIGHTS":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.logarithmicDepthBuffer&&i.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yi).join(`
`),g=[p,Ko(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,_,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+h:"",i.envMap?"#define "+u:"",i.envMap?"#define "+d:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+l:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.useLegacyLights?"#define LEGACY_LIGHTS":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.logarithmicDepthBuffer&&i.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==jt?"#define TONE_MAPPING":"",i.toneMapping!==jt?Ee.tonemapping_pars_fragment:"",i.toneMapping!==jt?Hc("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Ee.colorspace_pars_fragment,Bc("linearToOutputTexel",i.outputColorSpace),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Yi).join(`
`)),s=es(s),s=jo(s,i),s=Yo(s,i),o=es(o),o=jo(o,i),o=Yo(o,i),s=Zo(s),o=Zo(o),i.isWebGL2&&i.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[m,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["precision mediump sampler2DArray;","#define varying in",i.glslVersion===co?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===co?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=x+f+s,C=x+g+o,T=Xo(r,r.VERTEX_SHADER,y),A=Xo(r,r.FRAGMENT_SHADER,C);function F(R){if(t.debug.checkShaderErrors){let X=r.getProgramInfoLog(v).trim(),W=r.getShaderInfoLog(T).trim(),ae=r.getShaderInfoLog(A).trim(),ce=!0,ne=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(ce=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,v,T,A);else{let q=qo(r,T,"vertex"),J=qo(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+X+`
`+q+`
`+J)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):W!==""&&ae!==""||(ne=!1);ne&&(R.diagnostics={runnable:ce,programLog:X,vertexShader:{log:W,prefix:f},fragmentShader:{log:ae,prefix:g}})}r.deleteShader(T),r.deleteShader(A),L=new Ra(r,v),B=(function(X,W){let ae={},ce=X.getProgramParameter(W,X.ACTIVE_ATTRIBUTES);for(let ne=0;ne<ce;ne++){let q=X.getActiveAttrib(W,ne),J=q.name,z=1;q.type===X.FLOAT_MAT2&&(z=2),q.type===X.FLOAT_MAT3&&(z=3),q.type===X.FLOAT_MAT4&&(z=4),ae[J]={type:q.type,location:X.getAttribLocation(W,J),locationSize:z}}return ae})(r,v)}let L,B;r.attachShader(v,T),r.attachShader(v,A),i.index0AttributeName!==void 0?r.bindAttribLocation(v,0,i.index0AttributeName):i.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v),this.getUniforms=function(){return L===void 0&&F(this),L},this.getAttributes=function(){return B===void 0&&F(this),B};let G=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return G===!1&&(G=r.getProgramParameter(v,Fc)),G},this.destroy=function(){a.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=zc++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=A,this}var jc=0,Yc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,a=this._getShaderStage(e),r=this._getShaderStage(i),n=this._getShaderCacheForMaterial(t);return n.has(a)===!1&&(n.add(a),a.usedTimes++),n.has(r)===!1&&(n.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Zc(t),e.set(t,i)),i}},Zc=class{constructor(t){this.id=jc++,this.code=t,this.usedTimes=0}};function Kc(t,e,i,a,r,n,s){let o=new Hl,l=new Yc,h=new Set,u=[],d=r.isWebGL2,c=r.logarithmicDepthBuffer,p=r.vertexTextures,m=r.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(f){return h.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,x,y,C){let T=y.fog,A=C.geometry,F=f.isMeshStandardMaterial?y.environment:null,L=(f.isMeshStandardMaterial?i:e).get(f.envMap||F),B=L&&L.mapping===ja?L.image.height:null,G=_[f.type];f.precision!==null&&(m=r.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));let R=A.morphAttributes.position||A.morphAttributes.normal||A.morphAttributes.color,X=R!==void 0?R.length:0,W,ae,ce,ne,q=0;if(A.morphAttributes.position!==void 0&&(q=1),A.morphAttributes.normal!==void 0&&(q=2),A.morphAttributes.color!==void 0&&(q=3),G){let Ye=Rt[G];W=Ye.vertexShader,ae=Ye.fragmentShader}else W=f.vertexShader,ae=f.fragmentShader,l.update(f),ce=l.getVertexShaderID(f),ne=l.getFragmentShaderID(f);let J=t.getRenderTarget(),z=C.isInstancedMesh===!0,$=C.isBatchedMesh===!0,le=!!f.map,M=!!f.matcap,S=!!L,N=!!f.aoMap,te=!!f.lightMap,P=!!f.bumpMap,O=!!f.normalMap,U=!!f.displacementMap,D=!!f.emissiveMap,I=!!f.metalnessMap,Q=!!f.roughnessMap,Z=f.anisotropy>0,E=f.clearcoat>0,K=f.iridescence>0,H=f.sheen>0,j=f.transmission>0,ie=Z&&!!f.anisotropyMap,ue=E&&!!f.clearcoatMap,de=E&&!!f.clearcoatNormalMap,pe=E&&!!f.clearcoatRoughnessMap,xe=K&&!!f.iridescenceMap,me=K&&!!f.iridescenceThicknessMap,Le=H&&!!f.sheenColorMap,fe=H&&!!f.sheenRoughnessMap,be=!!f.specularMap,He=!!f.specularColorMap,_e=!!f.specularIntensityMap,Fe=j&&!!f.transmissionMap,De=j&&!!f.thicknessMap,Vr=!!f.gradientMap,ot=!!f.alphaMap,Ot=f.alphaTest>0,Ni=!!f.alphaHash,k=!!f.extensions,gr=jt;f.toneMapped&&(J!==null&&J.isXRRenderTarget!==!0||(gr=t.toneMapping));let di={isWebGL2:d,shaderID:G,shaderType:f.type,shaderName:f.name,vertexShader:W,fragmentShader:ae,defines:f.defines,customVertexShaderID:ce,customFragmentShaderID:ne,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:$,instancing:z,instancingColor:z&&C.instanceColor!==null,supportsVertexTextures:p,outputColorSpace:J===null?t.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Zt,alphaToCoverage:!!f.alphaToCoverage,map:le,matcap:M,envMap:S,envMapMode:S&&L.mapping,envMapCubeUVHeight:B,aoMap:N,lightMap:te,bumpMap:P,normalMap:O,displacementMap:p&&U,emissiveMap:D,normalMapObjectSpace:O&&f.normalMapType===1,normalMapTangentSpace:O&&f.normalMapType===0,metalnessMap:I,roughnessMap:Q,anisotropy:Z,anisotropyMap:ie,clearcoat:E,clearcoatMap:ue,clearcoatNormalMap:de,clearcoatRoughnessMap:pe,iridescence:K,iridescenceMap:xe,iridescenceThicknessMap:me,sheen:H,sheenColorMap:Le,sheenRoughnessMap:fe,specularMap:be,specularColorMap:He,specularIntensityMap:_e,transmission:j,transmissionMap:Fe,thicknessMap:De,gradientMap:Vr,opaque:f.transparent===!1&&f.blending===1&&f.alphaToCoverage===!1,alphaMap:ot,alphaTest:Ot,alphaHash:Ni,combine:f.combine,mapUv:le&&v(f.map.channel),aoMapUv:N&&v(f.aoMap.channel),lightMapUv:te&&v(f.lightMap.channel),bumpMapUv:P&&v(f.bumpMap.channel),normalMapUv:O&&v(f.normalMap.channel),displacementMapUv:U&&v(f.displacementMap.channel),emissiveMapUv:D&&v(f.emissiveMap.channel),metalnessMapUv:I&&v(f.metalnessMap.channel),roughnessMapUv:Q&&v(f.roughnessMap.channel),anisotropyMapUv:ie&&v(f.anisotropyMap.channel),clearcoatMapUv:ue&&v(f.clearcoatMap.channel),clearcoatNormalMapUv:de&&v(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&v(f.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&v(f.iridescenceMap.channel),iridescenceThicknessMapUv:me&&v(f.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&v(f.sheenColorMap.channel),sheenRoughnessMapUv:fe&&v(f.sheenRoughnessMap.channel),specularMapUv:be&&v(f.specularMap.channel),specularColorMapUv:He&&v(f.specularColorMap.channel),specularIntensityMapUv:_e&&v(f.specularIntensityMap.channel),transmissionMapUv:Fe&&v(f.transmissionMap.channel),thicknessMapUv:De&&v(f.thicknessMap.channel),alphaMapUv:ot&&v(f.alphaMap.channel),vertexTangents:!!A.attributes.tangent&&(O||Z),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!A.attributes.color&&A.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!A.attributes.uv&&(le||ot),fog:!!T,useFog:f.fog===!0,fogExp2:!!T&&T.isFogExp2,flatShading:f.flatShading===!0,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:c,skinning:C.isSkinnedMesh===!0,morphTargets:A.morphAttributes.position!==void 0,morphNormals:A.morphAttributes.normal!==void 0,morphColors:A.morphAttributes.color!==void 0,morphTargetsCount:X,morphTextureStride:q,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:t.shadowMap.enabled&&x.length>0,shadowMapType:t.shadowMap.type,toneMapping:gr,useLegacyLights:t._useLegacyLights,decodeVideoTexture:le&&f.map.isVideoTexture===!0&&Oe.getTransfer(f.map.colorSpace)===ze,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===2,flipSided:f.side===lt,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionDerivatives:k&&f.extensions.derivatives===!0,extensionFragDepth:k&&f.extensions.fragDepth===!0,extensionDrawBuffers:k&&f.extensions.drawBuffers===!0,extensionShaderTextureLOD:k&&f.extensions.shaderTextureLOD===!0,extensionClipCullDistance:k&&f.extensions.clipCullDistance===!0&&a.has("WEBGL_clip_cull_distance"),extensionMultiDraw:k&&f.extensions.multiDraw===!0&&a.has("WEBGL_multi_draw"),rendererExtensionFragDepth:d||a.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||a.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||a.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:a.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return di.vertexUv1s=h.has(1),di.vertexUv2s=h.has(2),di.vertexUv3s=h.has(3),h.clear(),di},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let x in f.defines)g.push(x),g.push(f.defines[x]);return f.isRawShaderMaterial===!1&&((function(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)})(g,f),(function(x,y){o.disableAll(),y.isWebGL2&&o.enable(0),y.supportsVertexTextures&&o.enable(1),y.instancing&&o.enable(2),y.instancingColor&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),x.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.skinning&&o.enable(4),y.morphTargets&&o.enable(5),y.morphNormals&&o.enable(6),y.morphColors&&o.enable(7),y.premultipliedAlpha&&o.enable(8),y.shadowMapEnabled&&o.enable(9),y.useLegacyLights&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.alphaToCoverage&&o.enable(20),x.push(o.mask)})(g,f),g.push(t.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=_[f.type],x;if(g){let y=Rt[g];x=Au.clone(y.uniforms)}else x=f.uniforms;return x},acquireProgram:function(f,g){let x;for(let y=0,C=u.length;y<C;y++){let T=u[y];if(T.cacheKey===g){x=T,++x.usedTimes;break}}return x===void 0&&(x=new qc(t,g,f,n),u.push(x)),x},releaseProgram:function(f){if(--f.usedTimes==0){let g=u.indexOf(f);u[g]=u[u.length-1],u.pop(),f.destroy()}},releaseShaderCache:function(f){l.remove(f)},programs:u,dispose:function(){l.dispose()}}}function Jc(){let t=new WeakMap;return{get:function(e){let i=t.get(e);return i===void 0&&(i={},t.set(e,i)),i},remove:function(e){t.delete(e)},update:function(e,i,a){t.get(e)[i]=a},dispose:function(){t=new WeakMap}}}function $c(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Jo(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function $o(){let t=[],e=0,i=[],a=[],r=[];function n(s,o,l,h,u,d){let c=t[e];return c===void 0?(c={id:s.id,object:s,geometry:o,material:l,groupOrder:h,renderOrder:s.renderOrder,z:u,group:d},t[e]=c):(c.id=s.id,c.object=s,c.geometry=o,c.material=l,c.groupOrder=h,c.renderOrder=s.renderOrder,c.z=u,c.group=d),e++,c}return{opaque:i,transmissive:a,transparent:r,init:function(){e=0,i.length=0,a.length=0,r.length=0},push:function(s,o,l,h,u,d){let c=n(s,o,l,h,u,d);l.transmission>0?a.push(c):l.transparent===!0?r.push(c):i.push(c)},unshift:function(s,o,l,h,u,d){let c=n(s,o,l,h,u,d);l.transmission>0?a.unshift(c):l.transparent===!0?r.unshift(c):i.unshift(c)},finish:function(){for(let s=e,o=t.length;s<o;s++){let l=t[s];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(s,o){i.length>1&&i.sort(s||$c),a.length>1&&a.sort(o||Jo),r.length>1&&r.sort(o||Jo)}}}function Qc(){let t=new WeakMap;return{get:function(e,i){let a=t.get(e),r;return a===void 0?(r=new $o,t.set(e,[r])):i>=a.length?(r=new $o,a.push(r)):r=a[i],r},dispose:function(){t=new WeakMap}}}function ed(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new w,color:new Ue};break;case"SpotLight":i={position:new w,direction:new w,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new w,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":i={direction:new w,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":i={color:new Ue,position:new w,halfWidth:new w,halfHeight:new w}}return t[e.id]=i,i}}}var td=0;function id(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function rd(t,e){let i=new ed,a=(function(){let l={};return{get:function(h){if(l[h.id]!==void 0)return l[h.id];let u;switch(h.type){case"DirectionalLight":case"SpotLight":u={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":u={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3}}return l[h.id]=u,u}}})(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)r.probe.push(new w);let n=new w,s=new Pe,o=new Pe;return{setup:function(l,h){let u=0,d=0,c=0;for(let B=0;B<9;B++)r.probe[B].set(0,0,0);let p=0,m=0,_=0,v=0,f=0,g=0,x=0,y=0,C=0,T=0,A=0;l.sort(id);let F=h===!0?Math.PI:1;for(let B=0,G=l.length;B<G;B++){let R=l[B],X=R.color,W=R.intensity,ae=R.distance,ce=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=X.r*W*F,d+=X.g*W*F,c+=X.b*W*F;else if(R.isLightProbe){for(let ne=0;ne<9;ne++)r.probe[ne].addScaledVector(R.sh.coefficients[ne],W);A++}else if(R.isDirectionalLight){let ne=i.get(R);if(ne.color.copy(R.color).multiplyScalar(R.intensity*F),R.castShadow){let q=R.shadow,J=a.get(R);J.shadowBias=q.bias,J.shadowNormalBias=q.normalBias,J.shadowRadius=q.radius,J.shadowMapSize=q.mapSize,r.directionalShadow[p]=J,r.directionalShadowMap[p]=ce,r.directionalShadowMatrix[p]=R.shadow.matrix,g++}r.directional[p]=ne,p++}else if(R.isSpotLight){let ne=i.get(R);ne.position.setFromMatrixPosition(R.matrixWorld),ne.color.copy(X).multiplyScalar(W*F),ne.distance=ae,ne.coneCos=Math.cos(R.angle),ne.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),ne.decay=R.decay,r.spot[_]=ne;let q=R.shadow;if(R.map&&(r.spotLightMap[C]=R.map,C++,q.updateMatrices(R),R.castShadow&&T++),r.spotLightMatrix[_]=q.matrix,R.castShadow){let J=a.get(R);J.shadowBias=q.bias,J.shadowNormalBias=q.normalBias,J.shadowRadius=q.radius,J.shadowMapSize=q.mapSize,r.spotShadow[_]=J,r.spotShadowMap[_]=ce,y++}_++}else if(R.isRectAreaLight){let ne=i.get(R);ne.color.copy(X).multiplyScalar(W),ne.halfWidth.set(.5*R.width,0,0),ne.halfHeight.set(0,.5*R.height,0),r.rectArea[v]=ne,v++}else if(R.isPointLight){let ne=i.get(R);if(ne.color.copy(R.color).multiplyScalar(R.intensity*F),ne.distance=R.distance,ne.decay=R.decay,R.castShadow){let q=R.shadow,J=a.get(R);J.shadowBias=q.bias,J.shadowNormalBias=q.normalBias,J.shadowRadius=q.radius,J.shadowMapSize=q.mapSize,J.shadowCameraNear=q.camera.near,J.shadowCameraFar=q.camera.far,r.pointShadow[m]=J,r.pointShadowMap[m]=ce,r.pointShadowMatrix[m]=R.shadow.matrix,x++}r.point[m]=ne,m++}else if(R.isHemisphereLight){let ne=i.get(R);ne.skyColor.copy(R.color).multiplyScalar(W*F),ne.groundColor.copy(R.groundColor).multiplyScalar(W*F),r.hemi[f]=ne,f++}}v>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=u,r.ambient[1]=d,r.ambient[2]=c;let L=r.hash;L.directionalLength===p&&L.pointLength===m&&L.spotLength===_&&L.rectAreaLength===v&&L.hemiLength===f&&L.numDirectionalShadows===g&&L.numPointShadows===x&&L.numSpotShadows===y&&L.numSpotMaps===C&&L.numLightProbes===A||(r.directional.length=p,r.spot.length=_,r.rectArea.length=v,r.point.length=m,r.hemi.length=f,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.pointShadow.length=x,r.pointShadowMap.length=x,r.spotShadow.length=y,r.spotShadowMap.length=y,r.directionalShadowMatrix.length=g,r.pointShadowMatrix.length=x,r.spotLightMatrix.length=y+C-T,r.spotLightMap.length=C,r.numSpotLightShadowsWithMaps=T,r.numLightProbes=A,L.directionalLength=p,L.pointLength=m,L.spotLength=_,L.rectAreaLength=v,L.hemiLength=f,L.numDirectionalShadows=g,L.numPointShadows=x,L.numSpotShadows=y,L.numSpotMaps=C,L.numLightProbes=A,r.version=td++)},setupView:function(l,h){let u=0,d=0,c=0,p=0,m=0,_=h.matrixWorldInverse;for(let v=0,f=l.length;v<f;v++){let g=l[v];if(g.isDirectionalLight){let x=r.directional[u];x.direction.setFromMatrixPosition(g.matrixWorld),n.setFromMatrixPosition(g.target.matrixWorld),x.direction.sub(n),x.direction.transformDirection(_),u++}else if(g.isSpotLight){let x=r.spot[c];x.position.setFromMatrixPosition(g.matrixWorld),x.position.applyMatrix4(_),x.direction.setFromMatrixPosition(g.matrixWorld),n.setFromMatrixPosition(g.target.matrixWorld),x.direction.sub(n),x.direction.transformDirection(_),c++}else if(g.isRectAreaLight){let x=r.rectArea[p];x.position.setFromMatrixPosition(g.matrixWorld),x.position.applyMatrix4(_),o.identity(),s.copy(g.matrixWorld),s.premultiply(_),o.extractRotation(s),x.halfWidth.set(.5*g.width,0,0),x.halfHeight.set(0,.5*g.height,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),p++}else if(g.isPointLight){let x=r.point[d];x.position.setFromMatrixPosition(g.matrixWorld),x.position.applyMatrix4(_),d++}else if(g.isHemisphereLight){let x=r.hemi[m];x.direction.setFromMatrixPosition(g.matrixWorld),x.direction.transformDirection(_),m++}}},state:r}}function Qo(t,e){let i=new rd(t,e),a=[],r=[];return{init:function(){a.length=0,r.length=0},state:{lightsArray:a,shadowsArray:r,lights:i},setupLights:function(n){i.setup(a,n)},setupLightsView:function(n){i.setupView(a,n)},pushLight:function(n){a.push(n)},pushShadow:function(n){r.push(n)}}}function ad(t,e){let i=new WeakMap;return{get:function(a,r=0){let n=i.get(a),s;return n===void 0?(s=new Qo(t,e),i.set(a,[s])):r>=n.length?(s=new Qo(t,e),n.push(s)):s=n[r],s},dispose:function(){i=new WeakMap}}}var nd=class extends Hr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},sd=class extends Hr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function od(t,e,i){let a=new ds,r=new se,n=new se,s=new et,o=new nd({depthPacking:3201}),l=new sd,h={},u=i.maxTextureSize,d={[ni]:lt,[lt]:ni,2:2},c=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`}),p=c.clone();p.defines.HORIZONTAL_PASS=1;let m=new Xe;m.setAttribute("position",new vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ze(m,c),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xl;let f=this.type;function g(T,A){let F=e.update(_);c.defines.VSM_SAMPLES!==T.blurSamples&&(c.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,c.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ci(r.x,r.y)),c.uniforms.shadow_pass.value=T.map.texture,c.uniforms.resolution.value=T.mapSize,c.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(A,null,F,c,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(A,null,F,p,_,null)}function x(T,A,F,L){let B=null,G=F.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(G!==void 0)B=G;else if(B=F.isPointLight===!0?l:o,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let R=B.uuid,X=A.uuid,W=h[R];W===void 0&&(W={},h[R]=W);let ae=W[X];ae===void 0&&(ae=B.clone(),W[X]=ae,A.addEventListener("dispose",C)),B=ae}return B.visible=A.visible,B.wireframe=A.wireframe,B.side=L===Vt?A.shadowSide!==null?A.shadowSide:A.side:A.shadowSide!==null?A.shadowSide:d[A.side],B.alphaMap=A.alphaMap,B.alphaTest=A.alphaTest,B.map=A.map,B.clipShadows=A.clipShadows,B.clippingPlanes=A.clippingPlanes,B.clipIntersection=A.clipIntersection,B.displacementMap=A.displacementMap,B.displacementScale=A.displacementScale,B.displacementBias=A.displacementBias,B.wireframeLinewidth=A.wireframeLinewidth,B.linewidth=A.linewidth,F.isPointLight===!0&&B.isMeshDistanceMaterial===!0&&(t.properties.get(B).light=F),B}function y(T,A,F,L,B){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&B===Vt)&&(!T.frustumCulled||a.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,T.matrixWorld);let R=e.update(T),X=T.material;if(Array.isArray(X)){let W=R.groups;for(let ae=0,ce=W.length;ae<ce;ae++){let ne=W[ae],q=X[ne.materialIndex];if(q&&q.visible){let J=x(T,q,L,B);T.onBeforeShadow(t,T,A,F,R,J,ne),t.renderBufferDirect(F,null,R,J,T,ne),T.onAfterShadow(t,T,A,F,R,J,ne)}}}else if(X.visible){let W=x(T,X,L,B);T.onBeforeShadow(t,T,A,F,R,W,null),t.renderBufferDirect(F,null,R,W,T,null),T.onAfterShadow(t,T,A,F,R,W,null)}}let G=T.children;for(let R=0,X=G.length;R<X;R++)y(G[R],A,F,L,B)}function C(T){T.target.removeEventListener("dispose",C);for(let A in h){let F=h[A],L=T.target.uuid;L in F&&(F[L].dispose(),delete F[L])}}this.render=function(T,A,F){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||T.length===0)return;let L=t.getRenderTarget(),B=t.getActiveCubeFace(),G=t.getActiveMipmapLevel(),R=t.state;R.setBlending(0),R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);let X=f!==Vt&&this.type===Vt,W=f===Vt&&this.type!==Vt;for(let ae=0,ce=T.length;ae<ce;ae++){let ne=T[ae],q=ne.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);let J=q.getFrameExtents();if(r.multiply(J),n.copy(q.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(n.x=Math.floor(u/J.x),r.x=n.x*J.x,q.mapSize.x=n.x),r.y>u&&(n.y=Math.floor(u/J.y),r.y=n.y*J.y,q.mapSize.y=n.y)),q.map===null||X===!0||W===!0){let $=this.type!==Vt?{minFilter:st,magFilter:st}:{};q.map!==null&&q.map.dispose(),q.map=new Ci(r.x,r.y,$),q.map.texture.name=ne.name+".shadowMap",q.camera.updateProjectionMatrix()}t.setRenderTarget(q.map),t.clear();let z=q.getViewportCount();for(let $=0;$<z;$++){let le=q.getViewport($);s.set(n.x*le.x,n.y*le.y,n.x*le.z,n.y*le.w),R.viewport(s),q.updateMatrices(ne,$),a=q.getFrustum(),y(A,F,q.camera,ne,this.type)}q.isPointLightShadow!==!0&&this.type===Vt&&g(q,F),q.needsUpdate=!1}f=this.type,v.needsUpdate=!1,t.setRenderTarget(L,B,G)}}function ld(t,e,i){let a=i.isWebGL2,r=new function(){let E=!1,K=new et,H=null,j=new et(0,0,0,0);return{setMask:function(ie){H===ie||E||(t.colorMask(ie,ie,ie,ie),H=ie)},setLocked:function(ie){E=ie},setClear:function(ie,ue,de,pe,xe){xe===!0&&(ie*=pe,ue*=pe,de*=pe),K.set(ie,ue,de,pe),j.equals(K)===!1&&(t.clearColor(ie,ue,de,pe),j.copy(K))},reset:function(){E=!1,H=null,j.set(-1,0,0,0)}}},n=new function(){let E=!1,K=null,H=null,j=null;return{setTest:function(ie){ie?te(t.DEPTH_TEST):P(t.DEPTH_TEST)},setMask:function(ie){K===ie||E||(t.depthMask(ie),K=ie)},setFunc:function(ie){if(H!==ie){switch(ie){case 0:t.depthFunc(t.NEVER);break;case 1:t.depthFunc(t.ALWAYS);break;case 2:t.depthFunc(t.LESS);break;case 3:default:t.depthFunc(t.LEQUAL);break;case 4:t.depthFunc(t.EQUAL);break;case 5:t.depthFunc(t.GEQUAL);break;case 6:t.depthFunc(t.GREATER);break;case 7:t.depthFunc(t.NOTEQUAL)}H=ie}},setLocked:function(ie){E=ie},setClear:function(ie){j!==ie&&(t.clearDepth(ie),j=ie)},reset:function(){E=!1,K=null,H=null,j=null}}},s=new function(){let E=!1,K=null,H=null,j=null,ie=null,ue=null,de=null,pe=null,xe=null;return{setTest:function(me){E||(me?te(t.STENCIL_TEST):P(t.STENCIL_TEST))},setMask:function(me){K===me||E||(t.stencilMask(me),K=me)},setFunc:function(me,Le,fe){H===me&&j===Le&&ie===fe||(t.stencilFunc(me,Le,fe),H=me,j=Le,ie=fe)},setOp:function(me,Le,fe){ue===me&&de===Le&&pe===fe||(t.stencilOp(me,Le,fe),ue=me,de=Le,pe=fe)},setLocked:function(me){E=me},setClear:function(me){xe!==me&&(t.clearStencil(me),xe=me)},reset:function(){E=!1,K=null,H=null,j=null,ie=null,ue=null,de=null,pe=null,xe=null}}},o=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,c=[],p=null,m=!1,_=null,v=null,f=null,g=null,x=null,y=null,C=null,T=new Ue(0,0,0),A=0,F=!1,L=null,B=null,G=null,R=null,X=null,W=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ae=!1,ce=0,ne=t.getParameter(t.VERSION);ne.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec(ne)[1]),ae=ce>=1):ne.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),ae=ce>=2);let q=null,J={},z=t.getParameter(t.SCISSOR_BOX),$=t.getParameter(t.VIEWPORT),le=new et().fromArray(z),M=new et().fromArray($);function S(E,K,H,j){let ie=new Uint8Array(4),ue=t.createTexture();t.bindTexture(E,ue),t.texParameteri(E,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(E,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let de=0;de<H;de++)!a||E!==t.TEXTURE_3D&&E!==t.TEXTURE_2D_ARRAY?t.texImage2D(K+de,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ie):t.texImage3D(K,0,t.RGBA,1,1,j,0,t.RGBA,t.UNSIGNED_BYTE,ie);return ue}let N={};function te(E){h[E]!==!0&&(t.enable(E),h[E]=!0)}function P(E){h[E]!==!1&&(t.disable(E),h[E]=!1)}N[t.TEXTURE_2D]=S(t.TEXTURE_2D,t.TEXTURE_2D,1),N[t.TEXTURE_CUBE_MAP]=S(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),a&&(N[t.TEXTURE_2D_ARRAY]=S(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),N[t.TEXTURE_3D]=S(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),r.setClear(0,0,0,1),n.setClear(1),s.setClear(0),te(t.DEPTH_TEST),n.setFunc(3),I(!1),Q(1),te(t.CULL_FACE),D(0);let O={[Mi]:t.FUNC_ADD,101:t.FUNC_SUBTRACT,102:t.FUNC_REVERSE_SUBTRACT};if(a)O[103]=t.MIN,O[104]=t.MAX;else{let E=e.get("EXT_blend_minmax");E!==null&&(O[103]=E.MIN_EXT,O[104]=E.MAX_EXT)}let U={200:t.ZERO,201:t.ONE,202:t.SRC_COLOR,[Wn]:t.SRC_ALPHA,210:t.SRC_ALPHA_SATURATE,208:t.DST_COLOR,206:t.DST_ALPHA,203:t.ONE_MINUS_SRC_COLOR,[Xn]:t.ONE_MINUS_SRC_ALPHA,209:t.ONE_MINUS_DST_COLOR,207:t.ONE_MINUS_DST_ALPHA,211:t.CONSTANT_COLOR,212:t.ONE_MINUS_CONSTANT_COLOR,213:t.CONSTANT_ALPHA,214:t.ONE_MINUS_CONSTANT_ALPHA};function D(E,K,H,j,ie,ue,de,pe,xe,me){if(E!==0){if(m===!1&&(te(t.BLEND),m=!0),E===5)ie=ie||K,ue=ue||H,de=de||j,K===v&&ie===x||(t.blendEquationSeparate(O[K],O[ie]),v=K,x=ie),H===f&&j===g&&ue===y&&de===C||(t.blendFuncSeparate(U[H],U[j],U[ue],U[de]),f=H,g=j,y=ue,C=de),pe.equals(T)!==!1&&xe===A||(t.blendColor(pe.r,pe.g,pe.b,xe),T.copy(pe),A=xe),_=E,F=!1;else if(E!==_||me!==F){if(v===Mi&&x===Mi||(t.blendEquation(t.FUNC_ADD),v=Mi,x=Mi),me)switch(E){case 1:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case 2:t.blendFunc(t.ONE,t.ONE);break;case 3:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case 4:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",E)}else switch(E){case 1:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case 2:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case 3:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case 4:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",E)}f=null,g=null,y=null,C=null,T.set(0,0,0),A=0,_=E,F=me}}else m===!0&&(P(t.BLEND),m=!1)}function I(E){L!==E&&(E?t.frontFace(t.CW):t.frontFace(t.CCW),L=E)}function Q(E){E!==0?(te(t.CULL_FACE),E!==B&&(E===1?t.cullFace(t.BACK):E===2?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):P(t.CULL_FACE),B=E}function Z(E,K,H){E?(te(t.POLYGON_OFFSET_FILL),R===K&&X===H||(t.polygonOffset(K,H),R=K,X=H)):P(t.POLYGON_OFFSET_FILL)}return{buffers:{color:r,depth:n,stencil:s},enable:te,disable:P,bindFramebuffer:function(E,K){return u[E]!==K&&(t.bindFramebuffer(E,K),u[E]=K,a&&(E===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=K),E===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=K)),!0)},drawBuffers:function(E,K){let H=c,j=!1;if(E)if(H=d.get(K),H===void 0&&(H=[],d.set(K,H)),E.isWebGLMultipleRenderTargets){let ie=E.texture;if(H.length!==ie.length||H[0]!==t.COLOR_ATTACHMENT0){for(let ue=0,de=ie.length;ue<de;ue++)H[ue]=t.COLOR_ATTACHMENT0+ue;H.length=ie.length,j=!0}}else H[0]!==t.COLOR_ATTACHMENT0&&(H[0]=t.COLOR_ATTACHMENT0,j=!0);else H[0]!==t.BACK&&(H[0]=t.BACK,j=!0);j&&(i.isWebGL2?t.drawBuffers(H):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(H))},useProgram:function(E){return p!==E&&(t.useProgram(E),p=E,!0)},setBlending:D,setMaterial:function(E,K){E.side===2?P(t.CULL_FACE):te(t.CULL_FACE);let H=E.side===lt;K&&(H=!H),I(H),E.blending===1&&E.transparent===!1?D(0):D(E.blending,E.blendEquation,E.blendSrc,E.blendDst,E.blendEquationAlpha,E.blendSrcAlpha,E.blendDstAlpha,E.blendColor,E.blendAlpha,E.premultipliedAlpha),n.setFunc(E.depthFunc),n.setTest(E.depthTest),n.setMask(E.depthWrite),r.setMask(E.colorWrite);let j=E.stencilWrite;s.setTest(j),j&&(s.setMask(E.stencilWriteMask),s.setFunc(E.stencilFunc,E.stencilRef,E.stencilFuncMask),s.setOp(E.stencilFail,E.stencilZFail,E.stencilZPass)),Z(E.polygonOffset,E.polygonOffsetFactor,E.polygonOffsetUnits),E.alphaToCoverage===!0?te(t.SAMPLE_ALPHA_TO_COVERAGE):P(t.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:I,setCullFace:Q,setLineWidth:function(E){E!==G&&(ae&&t.lineWidth(E),G=E)},setPolygonOffset:Z,setScissorTest:function(E){E?te(t.SCISSOR_TEST):P(t.SCISSOR_TEST)},activeTexture:function(E){E===void 0&&(E=t.TEXTURE0+W-1),q!==E&&(t.activeTexture(E),q=E)},bindTexture:function(E,K,H){H===void 0&&(H=q===null?t.TEXTURE0+W-1:q);let j=J[H];j===void 0&&(j={type:void 0,texture:void 0},J[H]=j),j.type===E&&j.texture===K||(q!==H&&(t.activeTexture(H),q=H),t.bindTexture(E,K||N[E]),j.type=E,j.texture=K)},unbindTexture:function(){let E=J[q];E!==void 0&&E.type!==void 0&&(t.bindTexture(E.type,null),E.type=void 0,E.texture=void 0)},compressedTexImage2D:function(){try{t.compressedTexImage2D.apply(t,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},compressedTexImage3D:function(){try{t.compressedTexImage3D.apply(t,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texImage2D:function(){try{t.texImage2D.apply(t,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texImage3D:function(){try{t.texImage3D.apply(t,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},updateUBOMapping:function(E,K){let H=l.get(K);H===void 0&&(H=new WeakMap,l.set(K,H));let j=H.get(E);j===void 0&&(j=t.getUniformBlockIndex(K,E.name),H.set(E,j))},uniformBlockBinding:function(E,K){let H=l.get(K).get(E);o.get(K)!==H&&(t.uniformBlockBinding(K,H,E.__bindingPointIndex),o.set(K,H))},texStorage2D:function(){try{t.texStorage2D.apply(t,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texStorage3D:function(){try{t.texStorage3D.apply(t,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texSubImage2D:function(){try{t.texSubImage2D.apply(t,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texSubImage3D:function(){try{t.texSubImage3D.apply(t,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},compressedTexSubImage2D:function(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},compressedTexSubImage3D:function(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},scissor:function(E){le.equals(E)===!1&&(t.scissor(E.x,E.y,E.z,E.w),le.copy(E))},viewport:function(E){M.equals(E)===!1&&(t.viewport(E.x,E.y,E.z,E.w),M.copy(E))},reset:function(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),a===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},q=null,J={},u={},d=new WeakMap,c=[],p=null,m=!1,_=null,v=null,f=null,g=null,x=null,y=null,C=null,T=new Ue(0,0,0),A=0,F=!1,L=null,B=null,G=null,R=null,X=null,le.set(0,0,t.canvas.width,t.canvas.height),M.set(0,0,t.canvas.width,t.canvas.height),r.reset(),n.reset(),s.reset()}}}function hd(t,e,i,a,r,n,s){let o=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,d,c=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(M,S){return p?new OffscreenCanvas(M,S):Ga("canvas")}function _(M,S,N,te){let P=1;if((M.width>te||M.height>te)&&(P=te/Math.max(M.width,M.height)),P<1||S===!0){if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){let O=S?Ha:Math.floor,U=O(P*M.width),D=O(P*M.height);d===void 0&&(d=m(U,D));let I=N?m(U,D):d;return I.width=U,I.height=D,I.getContext("2d").drawImage(M,0,0,U,D),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+U+"x"+D+")."),I}return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),M}return M}function v(M){return $n(M.width)&&$n(M.height)}function f(M,S){return M.generateMipmaps&&S&&M.minFilter!==st&&M.minFilter!==dt}function g(M){t.generateMipmap(M)}function x(M,S,N,te,P=!1){if(o===!1)return S;if(M!==null){if(t[M]!==void 0)return t[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let O=S;if(S===t.RED&&(N===t.FLOAT&&(O=t.R32F),N===t.HALF_FLOAT&&(O=t.R16F),N===t.UNSIGNED_BYTE&&(O=t.R8)),S===t.RED_INTEGER&&(N===t.UNSIGNED_BYTE&&(O=t.R8UI),N===t.UNSIGNED_SHORT&&(O=t.R16UI),N===t.UNSIGNED_INT&&(O=t.R32UI),N===t.BYTE&&(O=t.R8I),N===t.SHORT&&(O=t.R16I),N===t.INT&&(O=t.R32I)),S===t.RG&&(N===t.FLOAT&&(O=t.RG32F),N===t.HALF_FLOAT&&(O=t.RG16F),N===t.UNSIGNED_BYTE&&(O=t.RG8)),S===t.RGBA){let U=P?Oa:Oe.getTransfer(te);N===t.FLOAT&&(O=t.RGBA32F),N===t.HALF_FLOAT&&(O=t.RGBA16F),N===t.UNSIGNED_BYTE&&(O=U===ze?t.SRGB8_ALPHA8:t.RGBA8),N===t.UNSIGNED_SHORT_4_4_4_4&&(O=t.RGBA4),N===t.UNSIGNED_SHORT_5_5_5_1&&(O=t.RGB5_A1)}return O!==t.R16F&&O!==t.R32F&&O!==t.RG16F&&O!==t.RG32F&&O!==t.RGBA16F&&O!==t.RGBA32F||e.get("EXT_color_buffer_float"),O}function y(M,S,N){return f(M,N)===!0||M.isFramebufferTexture&&M.minFilter!==st&&M.minFilter!==dt?Math.log2(Math.max(S.width,S.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?S.mipmaps.length:1}function C(M){return M===st||M===Is||M===xr?t.NEAREST:t.LINEAR}function T(M){let S=M.target;S.removeEventListener("dispose",T),(function(N){let te=a.get(N);if(te.__webglInit===void 0)return;let P=N.source,O=c.get(P);if(O){let U=O[te.__cacheKey];U.usedTimes--,U.usedTimes===0&&F(N),Object.keys(O).length===0&&c.delete(P)}a.remove(N)})(S),S.isVideoTexture&&u.delete(S)}function A(M){let S=M.target;S.removeEventListener("dispose",A),(function(N){let te=N.texture,P=a.get(N),O=a.get(te);if(O.__webglTexture!==void 0&&(t.deleteTexture(O.__webglTexture),s.memory.textures--),N.depthTexture&&N.depthTexture.dispose(),N.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(P.__webglFramebuffer[U]))for(let D=0;D<P.__webglFramebuffer[U].length;D++)t.deleteFramebuffer(P.__webglFramebuffer[U][D]);else t.deleteFramebuffer(P.__webglFramebuffer[U]);P.__webglDepthbuffer&&t.deleteRenderbuffer(P.__webglDepthbuffer[U])}else{if(Array.isArray(P.__webglFramebuffer))for(let U=0;U<P.__webglFramebuffer.length;U++)t.deleteFramebuffer(P.__webglFramebuffer[U]);else t.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&t.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&t.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let U=0;U<P.__webglColorRenderbuffer.length;U++)P.__webglColorRenderbuffer[U]&&t.deleteRenderbuffer(P.__webglColorRenderbuffer[U]);P.__webglDepthRenderbuffer&&t.deleteRenderbuffer(P.__webglDepthRenderbuffer)}if(N.isWebGLMultipleRenderTargets)for(let U=0,D=te.length;U<D;U++){let I=a.get(te[U]);I.__webglTexture&&(t.deleteTexture(I.__webglTexture),s.memory.textures--),a.remove(te[U])}a.remove(te),a.remove(N)})(S)}function F(M){let S=a.get(M);t.deleteTexture(S.__webglTexture);let N=M.source;delete c.get(N)[S.__cacheKey],s.memory.textures--}let L=0;function B(M,S){let N=a.get(M);if(M.isVideoTexture&&(function(te){let P=s.render.frame;u.get(te)!==P&&(u.set(te,P),te.update())})(M),M.isRenderTargetTexture===!1&&M.version>0&&N.__version!==M.version){let te=M.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(te.complete!==!1)return void ce(N,M,S);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}i.bindTexture(t.TEXTURE_2D,N.__webglTexture,t.TEXTURE0+S)}let G={[Yn]:t.REPEAT,[Wt]:t.CLAMP_TO_EDGE,[Zn]:t.MIRRORED_REPEAT},R={[st]:t.NEAREST,[Is]:t.NEAREST_MIPMAP_NEAREST,[xr]:t.NEAREST_MIPMAP_LINEAR,[dt]:t.LINEAR,[sn]:t.LINEAR_MIPMAP_NEAREST,[Qi]:t.LINEAR_MIPMAP_LINEAR},X={512:t.NEVER,519:t.ALWAYS,513:t.LESS,515:t.LEQUAL,514:t.EQUAL,518:t.GEQUAL,516:t.GREATER,517:t.NOTEQUAL};function W(M,S,N){if(S.type!==Xt||e.has("OES_texture_float_linear")!==!1||S.magFilter!==dt&&S.magFilter!==sn&&S.magFilter!==xr&&S.magFilter!==Qi&&S.minFilter!==dt&&S.minFilter!==sn&&S.minFilter!==xr&&S.minFilter!==Qi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),N?(t.texParameteri(M,t.TEXTURE_WRAP_S,G[S.wrapS]),t.texParameteri(M,t.TEXTURE_WRAP_T,G[S.wrapT]),M!==t.TEXTURE_3D&&M!==t.TEXTURE_2D_ARRAY||t.texParameteri(M,t.TEXTURE_WRAP_R,G[S.wrapR]),t.texParameteri(M,t.TEXTURE_MAG_FILTER,R[S.magFilter]),t.texParameteri(M,t.TEXTURE_MIN_FILTER,R[S.minFilter])):(t.texParameteri(M,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(M,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),M!==t.TEXTURE_3D&&M!==t.TEXTURE_2D_ARRAY||t.texParameteri(M,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),S.wrapS===Wt&&S.wrapT===Wt||console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(M,t.TEXTURE_MAG_FILTER,C(S.magFilter)),t.texParameteri(M,t.TEXTURE_MIN_FILTER,C(S.minFilter)),S.minFilter!==st&&S.minFilter!==dt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(t.texParameteri(M,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(M,t.TEXTURE_COMPARE_FUNC,X[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let te=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===st||S.minFilter!==xr&&S.minFilter!==Qi||S.type===Xt&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===Ir&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||a.get(S).__currentAnisotropy)&&(t.texParameterf(M,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),a.get(S).__currentAnisotropy=S.anisotropy)}}function ae(M,S){let N=!1;M.__webglInit===void 0&&(M.__webglInit=!0,S.addEventListener("dispose",T));let te=S.source,P=c.get(te);P===void 0&&(P={},c.set(te,P));let O=(function(U){let D=[];return D.push(U.wrapS),D.push(U.wrapT),D.push(U.wrapR||0),D.push(U.magFilter),D.push(U.minFilter),D.push(U.anisotropy),D.push(U.internalFormat),D.push(U.format),D.push(U.type),D.push(U.generateMipmaps),D.push(U.premultiplyAlpha),D.push(U.flipY),D.push(U.unpackAlignment),D.push(U.colorSpace),D.join()})(S);if(O!==M.__cacheKey){P[O]===void 0&&(P[O]={texture:t.createTexture(),usedTimes:0},s.memory.textures++,N=!0),P[O].usedTimes++;let U=P[M.__cacheKey];U!==void 0&&(P[M.__cacheKey].usedTimes--,U.usedTimes===0&&F(S)),M.__cacheKey=O,M.__webglTexture=P[O].texture}return N}function ce(M,S,N){let te=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(te=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(te=t.TEXTURE_3D);let P=ae(M,S),O=S.source;i.bindTexture(te,M.__webglTexture,t.TEXTURE0+N);let U=a.get(O);if(O.version!==U.__version||P===!0){i.activeTexture(t.TEXTURE0+N);let D=Oe.getPrimaries(Oe.workingColorSpace),I=S.colorSpace===Nt?null:Oe.getPrimaries(S.colorSpace),Q=S.colorSpace===Nt||D===I?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let Z=(function(fe){return!o&&(fe.wrapS!==Wt||fe.wrapT!==Wt||fe.minFilter!==st&&fe.minFilter!==dt)})(S)&&v(S.image)===!1,E=_(S.image,Z,!1,r.maxTextureSize);E=le(S,E);let K=v(E)||o,H=n.convert(S.format,S.colorSpace),j,ie=n.convert(S.type),ue=x(S.internalFormat,H,ie,S.colorSpace,S.isVideoTexture);W(te,S,K);let de=S.mipmaps,pe=o&&S.isVideoTexture!==!0&&ue!==Rl,xe=U.__version===void 0||P===!0,me=O.dataReady,Le=y(S,E,K);if(S.isDepthTexture)ue=t.DEPTH_COMPONENT,o?ue=S.type===Xt?t.DEPTH_COMPONENT32F:S.type===ri?t.DEPTH_COMPONENT24:S.type===bi?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT16:S.type===Xt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===wi&&ue===t.DEPTH_COMPONENT&&S.type!==hs&&S.type!==ri&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=ri,ie=n.convert(S.type)),S.format===ur&&ue===t.DEPTH_COMPONENT&&(ue=t.DEPTH_STENCIL,S.type!==bi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=bi,ie=n.convert(S.type))),xe&&(pe?i.texStorage2D(t.TEXTURE_2D,1,ue,E.width,E.height):i.texImage2D(t.TEXTURE_2D,0,ue,E.width,E.height,0,H,ie,null));else if(S.isDataTexture)if(de.length>0&&K){pe&&xe&&i.texStorage2D(t.TEXTURE_2D,Le,ue,de[0].width,de[0].height);for(let fe=0,be=de.length;fe<be;fe++)j=de[fe],pe?me&&i.texSubImage2D(t.TEXTURE_2D,fe,0,0,j.width,j.height,H,ie,j.data):i.texImage2D(t.TEXTURE_2D,fe,ue,j.width,j.height,0,H,ie,j.data);S.generateMipmaps=!1}else pe?(xe&&i.texStorage2D(t.TEXTURE_2D,Le,ue,E.width,E.height),me&&i.texSubImage2D(t.TEXTURE_2D,0,0,0,E.width,E.height,H,ie,E.data)):i.texImage2D(t.TEXTURE_2D,0,ue,E.width,E.height,0,H,ie,E.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){pe&&xe&&i.texStorage3D(t.TEXTURE_2D_ARRAY,Le,ue,de[0].width,de[0].height,E.depth);for(let fe=0,be=de.length;fe<be;fe++)j=de[fe],S.format!==Lt?H!==null?pe?me&&i.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,fe,0,0,0,j.width,j.height,E.depth,H,j.data,0,0):i.compressedTexImage3D(t.TEXTURE_2D_ARRAY,fe,ue,j.width,j.height,E.depth,0,j.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pe?me&&i.texSubImage3D(t.TEXTURE_2D_ARRAY,fe,0,0,0,j.width,j.height,E.depth,H,ie,j.data):i.texImage3D(t.TEXTURE_2D_ARRAY,fe,ue,j.width,j.height,E.depth,0,H,ie,j.data)}else{pe&&xe&&i.texStorage2D(t.TEXTURE_2D,Le,ue,de[0].width,de[0].height);for(let fe=0,be=de.length;fe<be;fe++)j=de[fe],S.format!==Lt?H!==null?pe?me&&i.compressedTexSubImage2D(t.TEXTURE_2D,fe,0,0,j.width,j.height,H,j.data):i.compressedTexImage2D(t.TEXTURE_2D,fe,ue,j.width,j.height,0,j.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pe?me&&i.texSubImage2D(t.TEXTURE_2D,fe,0,0,j.width,j.height,H,ie,j.data):i.texImage2D(t.TEXTURE_2D,fe,ue,j.width,j.height,0,H,ie,j.data)}else if(S.isDataArrayTexture)pe?(xe&&i.texStorage3D(t.TEXTURE_2D_ARRAY,Le,ue,E.width,E.height,E.depth),me&&i.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,E.width,E.height,E.depth,H,ie,E.data)):i.texImage3D(t.TEXTURE_2D_ARRAY,0,ue,E.width,E.height,E.depth,0,H,ie,E.data);else if(S.isData3DTexture)pe?(xe&&i.texStorage3D(t.TEXTURE_3D,Le,ue,E.width,E.height,E.depth),me&&i.texSubImage3D(t.TEXTURE_3D,0,0,0,0,E.width,E.height,E.depth,H,ie,E.data)):i.texImage3D(t.TEXTURE_3D,0,ue,E.width,E.height,E.depth,0,H,ie,E.data);else if(S.isFramebufferTexture){if(xe)if(pe)i.texStorage2D(t.TEXTURE_2D,Le,ue,E.width,E.height);else{let fe=E.width,be=E.height;for(let He=0;He<Le;He++)i.texImage2D(t.TEXTURE_2D,He,ue,fe,be,0,H,ie,null),fe>>=1,be>>=1}}else if(de.length>0&&K){pe&&xe&&i.texStorage2D(t.TEXTURE_2D,Le,ue,de[0].width,de[0].height);for(let fe=0,be=de.length;fe<be;fe++)j=de[fe],pe?me&&i.texSubImage2D(t.TEXTURE_2D,fe,0,0,H,ie,j):i.texImage2D(t.TEXTURE_2D,fe,ue,H,ie,j);S.generateMipmaps=!1}else pe?(xe&&i.texStorage2D(t.TEXTURE_2D,Le,ue,E.width,E.height),me&&i.texSubImage2D(t.TEXTURE_2D,0,0,0,H,ie,E)):i.texImage2D(t.TEXTURE_2D,0,ue,H,ie,E);f(S,K)&&g(te),U.__version=O.version,S.onUpdate&&S.onUpdate(S)}M.__version=S.version}function ne(M,S,N,te,P,O){let U=n.convert(N.format,N.colorSpace),D=n.convert(N.type),I=x(N.internalFormat,U,D,N.colorSpace);if(!a.get(S).__hasExternalTextures){let Q=Math.max(1,S.width>>O),Z=Math.max(1,S.height>>O);P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY?i.texImage3D(P,O,I,Q,Z,S.depth,0,U,D,null):i.texImage2D(P,O,I,Q,Z,0,U,D,null)}i.bindFramebuffer(t.FRAMEBUFFER,M),$(S)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,te,P,a.get(N).__webglTexture,0,z(S)):(P===t.TEXTURE_2D||P>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&P<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,te,P,a.get(N).__webglTexture,O),i.bindFramebuffer(t.FRAMEBUFFER,null)}function q(M,S,N){if(t.bindRenderbuffer(t.RENDERBUFFER,M),S.depthBuffer&&!S.stencilBuffer){let te=o===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if(N||$(S)){let P=S.depthTexture;P&&P.isDepthTexture&&(P.type===Xt?te=t.DEPTH_COMPONENT32F:P.type===ri&&(te=t.DEPTH_COMPONENT24));let O=z(S);$(S)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,O,te,S.width,S.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,O,te,S.width,S.height)}else t.renderbufferStorage(t.RENDERBUFFER,te,S.width,S.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,M)}else if(S.depthBuffer&&S.stencilBuffer){let te=z(S);N&&$(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,te,t.DEPTH24_STENCIL8,S.width,S.height):$(S)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,te,t.DEPTH24_STENCIL8,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,M)}else{let te=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let P=0;P<te.length;P++){let O=te[P],U=n.convert(O.format,O.colorSpace),D=n.convert(O.type),I=x(O.internalFormat,U,D,O.colorSpace),Q=z(S);N&&$(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Q,I,S.width,S.height):$(S)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Q,I,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,I,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function J(M){let S=a.get(M),N=M.isWebGLCubeRenderTarget===!0;if(M.depthTexture&&!S.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");(function(te,P){if(P&&P.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(t.FRAMEBUFFER,te),!P.depthTexture||!P.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");a.get(P.depthTexture).__webglTexture&&P.depthTexture.image.width===P.width&&P.depthTexture.image.height===P.height||(P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0),B(P.depthTexture,0);let O=a.get(P.depthTexture).__webglTexture,U=z(P);if(P.depthTexture.format===wi)$(P)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,O,0,U):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,O,0);else{if(P.depthTexture.format!==ur)throw new Error("Unknown depthTexture format");$(P)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,O,0,U):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,O,0)}})(S.__webglFramebuffer,M)}else if(N){S.__webglDepthbuffer=[];for(let te=0;te<6;te++)i.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[te]),S.__webglDepthbuffer[te]=t.createRenderbuffer(),q(S.__webglDepthbuffer[te],M,!1)}else i.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=t.createRenderbuffer(),q(S.__webglDepthbuffer,M,!1);i.bindFramebuffer(t.FRAMEBUFFER,null)}function z(M){return Math.min(r.maxSamples,M.samples)}function $(M){let S=a.get(M);return o&&M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function le(M,S){let N=M.colorSpace,te=M.format,P=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||M.format===Kn||N!==Zt&&N!==Nt&&(Oe.getTransfer(N)===ze?o===!1?e.has("EXT_sRGB")===!0&&te===Lt?(M.format=Kn,M.minFilter=dt,M.generateMipmaps=!1):S=Ul.sRGBToLinear(S):te===Lt&&P===Ti||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),S}this.allocateTextureUnit=function(){let M=L;return M>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),L+=1,M},this.resetTextureUnits=function(){L=0},this.setTexture2D=B,this.setTexture2DArray=function(M,S){let N=a.get(M);M.version>0&&N.__version!==M.version?ce(N,M,S):i.bindTexture(t.TEXTURE_2D_ARRAY,N.__webglTexture,t.TEXTURE0+S)},this.setTexture3D=function(M,S){let N=a.get(M);M.version>0&&N.__version!==M.version?ce(N,M,S):i.bindTexture(t.TEXTURE_3D,N.__webglTexture,t.TEXTURE0+S)},this.setTextureCube=function(M,S){let N=a.get(M);M.version>0&&N.__version!==M.version?(function(te,P,O){if(P.image.length!==6)return;let U=ae(te,P),D=P.source;i.bindTexture(t.TEXTURE_CUBE_MAP,te.__webglTexture,t.TEXTURE0+O);let I=a.get(D);if(D.version!==I.__version||U===!0){i.activeTexture(t.TEXTURE0+O);let Q=Oe.getPrimaries(Oe.workingColorSpace),Z=P.colorSpace===Nt?null:Oe.getPrimaries(P.colorSpace),E=P.colorSpace===Nt||Q===Z?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,P.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,P.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,E);let K=P.isCompressedTexture||P.image[0].isCompressedTexture,H=P.image[0]&&P.image[0].isDataTexture,j=[];for(let _e=0;_e<6;_e++)j[_e]=K||H?H?P.image[_e].image:P.image[_e]:_(P.image[_e],!1,!0,r.maxCubemapSize),j[_e]=le(P,j[_e]);let ie=j[0],ue=v(ie)||o,de=n.convert(P.format,P.colorSpace),pe=n.convert(P.type),xe=x(P.internalFormat,de,pe,P.colorSpace),me=o&&P.isVideoTexture!==!0,Le=I.__version===void 0||U===!0,fe=D.dataReady,be,He=y(P,ie,ue);if(W(t.TEXTURE_CUBE_MAP,P,ue),K){me&&Le&&i.texStorage2D(t.TEXTURE_CUBE_MAP,He,xe,ie.width,ie.height);for(let _e=0;_e<6;_e++){be=j[_e].mipmaps;for(let Fe=0;Fe<be.length;Fe++){let De=be[Fe];P.format!==Lt?de!==null?me?fe&&i.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Fe,0,0,De.width,De.height,de,De.data):i.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Fe,xe,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):me?fe&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Fe,0,0,De.width,De.height,de,pe,De.data):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Fe,xe,De.width,De.height,0,de,pe,De.data)}}}else{be=P.mipmaps,me&&Le&&(be.length>0&&He++,i.texStorage2D(t.TEXTURE_CUBE_MAP,He,xe,j[0].width,j[0].height));for(let _e=0;_e<6;_e++)if(H){me?fe&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,j[_e].width,j[_e].height,de,pe,j[_e].data):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,xe,j[_e].width,j[_e].height,0,de,pe,j[_e].data);for(let Fe=0;Fe<be.length;Fe++){let De=be[Fe].image[_e].image;me?fe&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Fe+1,0,0,De.width,De.height,de,pe,De.data):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Fe+1,xe,De.width,De.height,0,de,pe,De.data)}}else{me?fe&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,de,pe,j[_e]):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,xe,de,pe,j[_e]);for(let Fe=0;Fe<be.length;Fe++){let De=be[Fe];me?fe&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Fe+1,0,0,de,pe,De.image[_e]):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Fe+1,xe,de,pe,De.image[_e])}}}f(P,ue)&&g(t.TEXTURE_CUBE_MAP),I.__version=D.version,P.onUpdate&&P.onUpdate(P)}te.__version=P.version})(N,M,S):i.bindTexture(t.TEXTURE_CUBE_MAP,N.__webglTexture,t.TEXTURE0+S)},this.rebindTextures=function(M,S,N){let te=a.get(M);S!==void 0&&ne(te.__webglFramebuffer,M,M.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),N!==void 0&&J(M)},this.setupRenderTarget=function(M){let S=M.texture,N=a.get(M),te=a.get(S);M.addEventListener("dispose",A),M.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=t.createTexture()),te.__version=S.version,s.memory.textures++);let P=M.isWebGLCubeRenderTarget===!0,O=M.isWebGLMultipleRenderTargets===!0,U=v(M)||o;if(P){N.__webglFramebuffer=[];for(let D=0;D<6;D++)if(o&&S.mipmaps&&S.mipmaps.length>0){N.__webglFramebuffer[D]=[];for(let I=0;I<S.mipmaps.length;I++)N.__webglFramebuffer[D][I]=t.createFramebuffer()}else N.__webglFramebuffer[D]=t.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){N.__webglFramebuffer=[];for(let D=0;D<S.mipmaps.length;D++)N.__webglFramebuffer[D]=t.createFramebuffer()}else N.__webglFramebuffer=t.createFramebuffer();if(O)if(r.drawBuffers){let D=M.texture;for(let I=0,Q=D.length;I<Q;I++){let Z=a.get(D[I]);Z.__webglTexture===void 0&&(Z.__webglTexture=t.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&M.samples>0&&$(M)===!1){let D=O?S:[S];N.__webglMultisampledFramebuffer=t.createFramebuffer(),N.__webglColorRenderbuffer=[],i.bindFramebuffer(t.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let I=0;I<D.length;I++){let Q=D[I];N.__webglColorRenderbuffer[I]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,N.__webglColorRenderbuffer[I]);let Z=n.convert(Q.format,Q.colorSpace),E=n.convert(Q.type),K=x(Q.internalFormat,Z,E,Q.colorSpace,M.isXRRenderTarget===!0),H=z(M);t.renderbufferStorageMultisample(t.RENDERBUFFER,H,K,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+I,t.RENDERBUFFER,N.__webglColorRenderbuffer[I])}t.bindRenderbuffer(t.RENDERBUFFER,null),M.depthBuffer&&(N.__webglDepthRenderbuffer=t.createRenderbuffer(),q(N.__webglDepthRenderbuffer,M,!0)),i.bindFramebuffer(t.FRAMEBUFFER,null)}}if(P){i.bindTexture(t.TEXTURE_CUBE_MAP,te.__webglTexture),W(t.TEXTURE_CUBE_MAP,S,U);for(let D=0;D<6;D++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let I=0;I<S.mipmaps.length;I++)ne(N.__webglFramebuffer[D][I],M,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+D,I);else ne(N.__webglFramebuffer[D],M,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+D,0);f(S,U)&&g(t.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(O){let D=M.texture;for(let I=0,Q=D.length;I<Q;I++){let Z=D[I],E=a.get(Z);i.bindTexture(t.TEXTURE_2D,E.__webglTexture),W(t.TEXTURE_2D,Z,U),ne(N.__webglFramebuffer,M,Z,t.COLOR_ATTACHMENT0+I,t.TEXTURE_2D,0),f(Z,U)&&g(t.TEXTURE_2D)}i.unbindTexture()}else{let D=t.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(o?D=M.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),i.bindTexture(D,te.__webglTexture),W(D,S,U),o&&S.mipmaps&&S.mipmaps.length>0)for(let I=0;I<S.mipmaps.length;I++)ne(N.__webglFramebuffer[I],M,S,t.COLOR_ATTACHMENT0,D,I);else ne(N.__webglFramebuffer,M,S,t.COLOR_ATTACHMENT0,D,0);f(S,U)&&g(D),i.unbindTexture()}M.depthBuffer&&J(M)},this.updateRenderTargetMipmap=function(M){let S=v(M)||o,N=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let te=0,P=N.length;te<P;te++){let O=N[te];if(f(O,S)){let U=M.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,D=a.get(O).__webglTexture;i.bindTexture(U,D),g(U),i.unbindTexture()}}},this.updateMultisampleRenderTarget=function(M){if(o&&M.samples>0&&$(M)===!1){let S=M.isWebGLMultipleRenderTargets?M.texture:[M.texture],N=M.width,te=M.height,P=t.COLOR_BUFFER_BIT,O=[],U=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,D=a.get(M),I=M.isWebGLMultipleRenderTargets===!0;if(I)for(let Q=0;Q<S.length;Q++)i.bindFramebuffer(t.FRAMEBUFFER,D.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Q,t.RENDERBUFFER,null),i.bindFramebuffer(t.FRAMEBUFFER,D.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Q,t.TEXTURE_2D,null,0);i.bindFramebuffer(t.READ_FRAMEBUFFER,D.__webglMultisampledFramebuffer),i.bindFramebuffer(t.DRAW_FRAMEBUFFER,D.__webglFramebuffer);for(let Q=0;Q<S.length;Q++){O.push(t.COLOR_ATTACHMENT0+Q),M.depthBuffer&&O.push(U);let Z=D.__ignoreDepthValues!==void 0&&D.__ignoreDepthValues;if(Z===!1&&(M.depthBuffer&&(P|=t.DEPTH_BUFFER_BIT),M.stencilBuffer&&(P|=t.STENCIL_BUFFER_BIT)),I&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,D.__webglColorRenderbuffer[Q]),Z===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[U]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[U])),I){let E=a.get(S[Q]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,E,0)}t.blitFramebuffer(0,0,N,te,0,0,N,te,P,t.NEAREST),h&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,O)}if(i.bindFramebuffer(t.READ_FRAMEBUFFER,null),i.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),I)for(let Q=0;Q<S.length;Q++){i.bindFramebuffer(t.FRAMEBUFFER,D.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Q,t.RENDERBUFFER,D.__webglColorRenderbuffer[Q]);let Z=a.get(S[Q]).__webglTexture;i.bindFramebuffer(t.FRAMEBUFFER,D.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Q,t.TEXTURE_2D,Z,0)}i.bindFramebuffer(t.DRAW_FRAMEBUFFER,D.__webglMultisampledFramebuffer)}},this.setupDepthRenderbuffer=J,this.setupFrameBufferTexture=ne,this.useMultisampledRTT=$}function ud(t,e,i){let a=i.isWebGL2;return{convert:function(r,n=""){let s,o=Oe.getTransfer(n);if(r===Ti)return t.UNSIGNED_BYTE;if(r===El)return t.UNSIGNED_SHORT_4_4_4_4;if(r===Tl)return t.UNSIGNED_SHORT_5_5_5_1;if(r===1010)return t.BYTE;if(r===1011)return t.SHORT;if(r===hs)return t.UNSIGNED_SHORT;if(r===Ml)return t.INT;if(r===ri)return t.UNSIGNED_INT;if(r===Xt)return t.FLOAT;if(r===Ir)return a?t.HALF_FLOAT:(s=e.get("OES_texture_half_float"),s!==null?s.HALF_FLOAT_OES:null);if(r===1021)return t.ALPHA;if(r===Lt)return t.RGBA;if(r===1024)return t.LUMINANCE;if(r===1025)return t.LUMINANCE_ALPHA;if(r===wi)return t.DEPTH_COMPONENT;if(r===ur)return t.DEPTH_STENCIL;if(r===Kn)return s=e.get("EXT_sRGB"),s!==null?s.SRGB_ALPHA_EXT:null;if(r===1028)return t.RED;if(r===bl)return t.RED_INTEGER;if(r===1030)return t.RG;if(r===wl)return t.RG_INTEGER;if(r===Al)return t.RGBA_INTEGER;if(r===on||r===ln||r===hn||r===un)if(o===ze){if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s===null)return null;if(r===on)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ln)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===hn)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===un)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(s=e.get("WEBGL_compressed_texture_s3tc"),s===null)return null;if(r===on)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ln)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===hn)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===un)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(r===Os||r===Fs||r===zs||r===Bs){if(s=e.get("WEBGL_compressed_texture_pvrtc"),s===null)return null;if(r===Os)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Fs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===zs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Bs)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(r===Rl)return s=e.get("WEBGL_compressed_texture_etc1"),s!==null?s.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Hs||r===Gs){if(s=e.get("WEBGL_compressed_texture_etc"),s===null)return null;if(r===Hs)return o===ze?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(r===Gs)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}if(r===Vs||r===ks||r===Ws||r===Xs||r===qs||r===js||r===Ys||r===Zs||r===Ks||r===Js||r===$s||r===Qs||r===eo||r===to){if(s=e.get("WEBGL_compressed_texture_astc"),s===null)return null;if(r===Vs)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ks)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ws)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Xs)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===qs)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===js)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ys)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Zs)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ks)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Js)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===$s)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Qs)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===eo)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===to)return o===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}if(r===cn||r===io||r===ro){if(s=e.get("EXT_texture_compression_bptc"),s===null)return null;if(r===cn)return o===ze?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===io)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ro)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(r===36283||r===ao||r===no||r===so){if(s=e.get("EXT_texture_compression_rgtc"),s===null)return null;if(r===cn)return s.COMPRESSED_RED_RGTC1_EXT;if(r===ao)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===no)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===so)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return r===bi?a?t.UNSIGNED_INT_24_8:(s=e.get("WEBGL_depth_texture"),s!==null?s.UNSIGNED_INT_24_8_WEBGL:null):t[r]!==void 0?t[r]:null}}}var cd=class extends gt{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},er=class extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}},dd={type:"move"},In=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new er,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new er,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new er,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let a=null,r=null,n=null,s=this._targetRay,o=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){n=!0;for(let m of t.hand.values()){let _=e.getJointPose(m,i),v=this._getHandJoint(l,m);_!==null&&(v.matrix.fromArray(_.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=_.radius),v.visible=_!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),c=.02,p=.005;l.inputState.pinching&&d>c+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=c-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else o!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1));s!==null&&(a=e.getPose(t.targetRaySpace,i),a===null&&r!==null&&(a=r),a!==null&&(s.matrix.fromArray(a.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,a.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(a.linearVelocity)):s.hasLinearVelocity=!1,a.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(a.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(dd)))}return s!==null&&(s.visible=a!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=n!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new er;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},pd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let a=new _t;t.properties.get(a).__webglTexture=e.texture,e.depthNear==i.depthNear&&e.depthFar==i.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=a}}render(t,e){if(this.texture!==null){if(this.mesh===null){let i=e.cameras[0].viewport,a=new oi({extensions:{fragDepth:!0},vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Ze(new Dt(20,20),a)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}},fd=class extends pr{constructor(t,e){super();let i=this,a=null,r=1,n=null,s="local-floor",o=1,l=null,h=null,u=null,d=null,c=null,p=null,m=new pd,_=e.getContextAttributes(),v=null,f=null,g=[],x=[],y=new se,C=null,T=new gt;T.layers.enable(1),T.viewport=new et;let A=new gt;A.layers.enable(2),A.viewport=new et;let F=[T,A],L=new cd;L.layers.enable(1),L.layers.enable(2);let B=null,G=null;function R(z){let $=x.indexOf(z.inputSource);if($===-1)return;let le=g[$];le!==void 0&&(le.update(z.inputSource,z.frame,l||n),le.dispatchEvent({type:z.type,data:z.inputSource}))}function X(){a.removeEventListener("select",R),a.removeEventListener("selectstart",R),a.removeEventListener("selectend",R),a.removeEventListener("squeeze",R),a.removeEventListener("squeezestart",R),a.removeEventListener("squeezeend",R),a.removeEventListener("end",X),a.removeEventListener("inputsourceschange",W);for(let z=0;z<g.length;z++){let $=x[z];$!==null&&(x[z]=null,g[z].disconnect($))}B=null,G=null,m.reset(),t.setRenderTarget(v),c=null,d=null,u=null,a=null,f=null,J.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(y.width,y.height,!1),i.dispatchEvent({type:"sessionend"})}function W(z){for(let $=0;$<z.removed.length;$++){let le=z.removed[$],M=x.indexOf(le);M>=0&&(x[M]=null,g[M].disconnect(le))}for(let $=0;$<z.added.length;$++){let le=z.added[$],M=x.indexOf(le);if(M===-1){for(let N=0;N<g.length;N++){if(N>=x.length){x.push(le),M=N;break}if(x[N]===null){x[N]=le,M=N;break}}if(M===-1)break}let S=g[M];S&&S.connect(le)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let $=g[z];return $===void 0&&($=new In,g[z]=$),$.getTargetRaySpace()},this.getControllerGrip=function(z){let $=g[z];return $===void 0&&($=new In,g[z]=$),$.getGripSpace()},this.getHand=function(z){let $=g[z];return $===void 0&&($=new In,g[z]=$),$.getHandSpace()},this.setFramebufferScaleFactor=function(z){r=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){s=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||n},this.setReferenceSpace=function(z){l=z},this.getBaseLayer=function(){return d!==null?d:c},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return a},this.setSession=async function(z){if(a=z,a!==null){if(v=t.getRenderTarget(),a.addEventListener("select",R),a.addEventListener("selectstart",R),a.addEventListener("selectend",R),a.addEventListener("squeeze",R),a.addEventListener("squeezestart",R),a.addEventListener("squeezeend",R),a.addEventListener("end",X),a.addEventListener("inputsourceschange",W),_.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(y),a.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let $={antialias:a.renderState.layers!==void 0||_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};c=new XRWebGLLayer(a,e,$),a.updateRenderState({baseLayer:c}),t.setPixelRatio(1),t.setSize(c.framebufferWidth,c.framebufferHeight,!1),f=new Ci(c.framebufferWidth,c.framebufferHeight,{format:Lt,type:Ti,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let $=null,le=null,M=null;_.depth&&(M=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=_.stencil?ur:wi,le=_.stencil?bi:ri);let S={colorFormat:e.RGBA8,depthFormat:M,scaleFactor:r};u=new XRWebGLBinding(a,e),d=u.createProjectionLayer(S),a.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),f=new Ci(d.textureWidth,d.textureHeight,{format:Lt,type:Ti,depthTexture:new Kl(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0}),t.properties.get(f).__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(o),l=null,n=await a.requestReferenceSpace(s),J.setContext(a),J.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode};let ae=new w,ce=new w;function ne(z,$){$===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices($.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(a===null)return;m.texture!==null&&(z.near=m.depthNear,z.far=m.depthFar),L.near=A.near=T.near=z.near,L.far=A.far=T.far=z.far,B===L.near&&G===L.far||(a.updateRenderState({depthNear:L.near,depthFar:L.far}),B=L.near,G=L.far,T.near=B,T.far=G,A.near=B,A.far=G,T.updateProjectionMatrix(),A.updateProjectionMatrix(),z.updateProjectionMatrix());let $=z.parent,le=L.cameras;ne(L,$);for(let M=0;M<le.length;M++)ne(le[M],$);le.length===2?(function(M,S,N){ae.setFromMatrixPosition(S.matrixWorld),ce.setFromMatrixPosition(N.matrixWorld);let te=ae.distanceTo(ce),P=S.projectionMatrix.elements,O=N.projectionMatrix.elements,U=P[14]/(P[10]-1),D=P[14]/(P[10]+1),I=(P[9]+1)/P[5],Q=(P[9]-1)/P[5],Z=(P[8]-1)/P[0],E=(O[8]+1)/O[0],K=U*Z,H=U*E,j=te/(-Z+E),ie=j*-Z;S.matrixWorld.decompose(M.position,M.quaternion,M.scale),M.translateX(ie),M.translateZ(j),M.matrixWorld.compose(M.position,M.quaternion,M.scale),M.matrixWorldInverse.copy(M.matrixWorld).invert();let ue=U+j,de=D+j,pe=K-ie,xe=H+(te-ie),me=I*D/de*ue,Le=Q*D/de*ue;M.projectionMatrix.makePerspective(pe,xe,me,Le,ue,de),M.projectionMatrixInverse.copy(M.projectionMatrix).invert()})(L,T,A):L.projectionMatrix.copy(T.projectionMatrix),(function(M,S,N){N===null?M.matrix.copy(S.matrixWorld):(M.matrix.copy(N.matrixWorld),M.matrix.invert(),M.matrix.multiply(S.matrixWorld)),M.matrix.decompose(M.position,M.quaternion,M.scale),M.updateMatrixWorld(!0),M.projectionMatrix.copy(S.projectionMatrix),M.projectionMatrixInverse.copy(S.projectionMatrixInverse),M.isPerspectiveCamera&&(M.fov=2*Or*Math.atan(1/M.projectionMatrix.elements[5]),M.zoom=1)})(z,L,$)},this.getCamera=function(){return L},this.getFoveation=function(){if(d!==null||c!==null)return o},this.setFoveation=function(z){o=z,d!==null&&(d.fixedFoveation=z),c!==null&&c.fixedFoveation!==void 0&&(c.fixedFoveation=z)},this.hasDepthSensing=function(){return m.texture!==null};let q=null,J=new Yl;J.setAnimationLoop((function(z,$){if(h=$.getViewerPose(l||n),p=$,h!==null){let le=h.views;c!==null&&(t.setRenderTargetFramebuffer(f,c.framebuffer),t.setRenderTarget(f));let M=!1;le.length!==L.cameras.length&&(L.cameras.length=0,M=!0);for(let N=0;N<le.length;N++){let te=le[N],P=null;if(c!==null)P=c.getViewport(te);else{let U=u.getViewSubImage(d,te);P=U.viewport,N===0&&(t.setRenderTargetTextures(f,U.colorTexture,d.ignoreDepthValues?void 0:U.depthStencilTexture),t.setRenderTarget(f))}let O=F[N];O===void 0&&(O=new gt,O.layers.enable(N),O.viewport=new et,F[N]=O),O.matrix.fromArray(te.transform.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale),O.projectionMatrix.fromArray(te.projectionMatrix),O.projectionMatrixInverse.copy(O.projectionMatrix).invert(),O.viewport.set(P.x,P.y,P.width,P.height),N===0&&(L.matrix.copy(O.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),M===!0&&L.cameras.push(O)}let S=a.enabledFeatures;if(S&&S.includes("depth-sensing")){let N=u.getDepthInformation(le[0]);N&&N.isValid&&N.texture&&m.init(t,N,a.renderState)}}for(let le=0;le<g.length;le++){let M=x[le],S=g[le];M!==null&&S!==void 0&&S.update(M,$,l||n)}m.render(t,L),q&&q(z,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),p=null})),this.setAnimationLoop=function(z){q=z},this.dispose=function(){}}};function md(t,e){function i(r,n){r.matrixAutoUpdate===!0&&r.updateMatrix(),n.value.copy(r.matrix)}function a(r,n){r.opacity.value=n.opacity,n.color&&r.diffuse.value.copy(n.color),n.emissive&&r.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity),n.map&&(r.map.value=n.map,i(n.map,r.mapTransform)),n.alphaMap&&(r.alphaMap.value=n.alphaMap,i(n.alphaMap,r.alphaMapTransform)),n.bumpMap&&(r.bumpMap.value=n.bumpMap,i(n.bumpMap,r.bumpMapTransform),r.bumpScale.value=n.bumpScale,n.side===lt&&(r.bumpScale.value*=-1)),n.normalMap&&(r.normalMap.value=n.normalMap,i(n.normalMap,r.normalMapTransform),r.normalScale.value.copy(n.normalScale),n.side===lt&&r.normalScale.value.negate()),n.displacementMap&&(r.displacementMap.value=n.displacementMap,i(n.displacementMap,r.displacementMapTransform),r.displacementScale.value=n.displacementScale,r.displacementBias.value=n.displacementBias),n.emissiveMap&&(r.emissiveMap.value=n.emissiveMap,i(n.emissiveMap,r.emissiveMapTransform)),n.specularMap&&(r.specularMap.value=n.specularMap,i(n.specularMap,r.specularMapTransform)),n.alphaTest>0&&(r.alphaTest.value=n.alphaTest);let s=e.get(n).envMap;if(s&&(r.envMap.value=s,r.flipEnvMap.value=s.isCubeTexture&&s.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=n.reflectivity,r.ior.value=n.ior,r.refractionRatio.value=n.refractionRatio),n.lightMap){r.lightMap.value=n.lightMap;let o=t._useLegacyLights===!0?Math.PI:1;r.lightMapIntensity.value=n.lightMapIntensity*o,i(n.lightMap,r.lightMapTransform)}n.aoMap&&(r.aoMap.value=n.aoMap,r.aoMapIntensity.value=n.aoMapIntensity,i(n.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,n){n.color.getRGB(r.fogColor.value,ql(t)),n.isFog?(r.fogNear.value=n.near,r.fogFar.value=n.far):n.isFogExp2&&(r.fogDensity.value=n.density)},refreshMaterialUniforms:function(r,n,s,o,l){n.isMeshBasicMaterial||n.isMeshLambertMaterial?a(r,n):n.isMeshToonMaterial?(a(r,n),(function(h,u){u.gradientMap&&(h.gradientMap.value=u.gradientMap)})(r,n)):n.isMeshPhongMaterial?(a(r,n),(function(h,u){h.specular.value.copy(u.specular),h.shininess.value=Math.max(u.shininess,1e-4)})(r,n)):n.isMeshStandardMaterial?(a(r,n),(function(h,u){h.metalness.value=u.metalness,u.metalnessMap&&(h.metalnessMap.value=u.metalnessMap,i(u.metalnessMap,h.metalnessMapTransform)),h.roughness.value=u.roughness,u.roughnessMap&&(h.roughnessMap.value=u.roughnessMap,i(u.roughnessMap,h.roughnessMapTransform)),e.get(u).envMap&&(h.envMapIntensity.value=u.envMapIntensity)})(r,n),n.isMeshPhysicalMaterial&&(function(h,u,d){h.ior.value=u.ior,u.sheen>0&&(h.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),h.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(h.sheenColorMap.value=u.sheenColorMap,i(u.sheenColorMap,h.sheenColorMapTransform)),u.sheenRoughnessMap&&(h.sheenRoughnessMap.value=u.sheenRoughnessMap,i(u.sheenRoughnessMap,h.sheenRoughnessMapTransform))),u.clearcoat>0&&(h.clearcoat.value=u.clearcoat,h.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(h.clearcoatMap.value=u.clearcoatMap,i(u.clearcoatMap,h.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,i(u.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(h.clearcoatNormalMap.value=u.clearcoatNormalMap,i(u.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===lt&&h.clearcoatNormalScale.value.negate())),u.iridescence>0&&(h.iridescence.value=u.iridescence,h.iridescenceIOR.value=u.iridescenceIOR,h.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],h.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(h.iridescenceMap.value=u.iridescenceMap,i(u.iridescenceMap,h.iridescenceMapTransform)),u.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=u.iridescenceThicknessMap,i(u.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),u.transmission>0&&(h.transmission.value=u.transmission,h.transmissionSamplerMap.value=d.texture,h.transmissionSamplerSize.value.set(d.width,d.height),u.transmissionMap&&(h.transmissionMap.value=u.transmissionMap,i(u.transmissionMap,h.transmissionMapTransform)),h.thickness.value=u.thickness,u.thicknessMap&&(h.thicknessMap.value=u.thicknessMap,i(u.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=u.attenuationDistance,h.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(h.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(h.anisotropyMap.value=u.anisotropyMap,i(u.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=u.specularIntensity,h.specularColor.value.copy(u.specularColor),u.specularColorMap&&(h.specularColorMap.value=u.specularColorMap,i(u.specularColorMap,h.specularColorMapTransform)),u.specularIntensityMap&&(h.specularIntensityMap.value=u.specularIntensityMap,i(u.specularIntensityMap,h.specularIntensityMapTransform))})(r,n,l)):n.isMeshMatcapMaterial?(a(r,n),(function(h,u){u.matcap&&(h.matcap.value=u.matcap)})(r,n)):n.isMeshDepthMaterial?a(r,n):n.isMeshDistanceMaterial?(a(r,n),(function(h,u){let d=e.get(u).light;h.referencePosition.value.setFromMatrixPosition(d.matrixWorld),h.nearDistance.value=d.shadow.camera.near,h.farDistance.value=d.shadow.camera.far})(r,n)):n.isMeshNormalMaterial?a(r,n):n.isLineBasicMaterial?((function(h,u){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,u.map&&(h.map.value=u.map,i(u.map,h.mapTransform))})(r,n),n.isLineDashedMaterial&&(function(h,u){h.dashSize.value=u.dashSize,h.totalSize.value=u.dashSize+u.gapSize,h.scale.value=u.scale})(r,n)):n.isPointsMaterial?(function(h,u,d,c){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,h.size.value=u.size*d,h.scale.value=.5*c,u.map&&(h.map.value=u.map,i(u.map,h.uvTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,i(u.alphaMap,h.alphaMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest)})(r,n,s,o):n.isSpriteMaterial?(function(h,u){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,h.rotation.value=u.rotation,u.map&&(h.map.value=u.map,i(u.map,h.mapTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,i(u.alphaMap,h.alphaMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest)})(r,n):n.isShadowMaterial?(r.color.value.copy(n.color),r.opacity.value=n.opacity):n.isShaderMaterial&&(n.uniformsNeedUpdate=!1)}}}function gd(t,e,i,a){let r={},n={},s=[],o=i.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(d,c,p,m){let _=d.value,v=c+"_"+p;if(m[v]===void 0)return m[v]=typeof _=="number"||typeof _=="boolean"?_:_.clone(),!0;{let f=m[v];if(typeof _=="number"||typeof _=="boolean"){if(f!==_)return m[v]=_,!0}else if(f.equals(_)===!1)return f.copy(_),!0}return!1}function h(d){let c={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(c.boundary=4,c.storage=4):d.isVector2?(c.boundary=8,c.storage=8):d.isVector3||d.isColor?(c.boundary=16,c.storage=12):d.isVector4?(c.boundary=16,c.storage=16):d.isMatrix3?(c.boundary=48,c.storage=48):d.isMatrix4?(c.boundary=64,c.storage=64):d.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",d),c}function u(d){let c=d.target;c.removeEventListener("dispose",u);let p=s.indexOf(c.__bindingPointIndex);s.splice(p,1),t.deleteBuffer(r[c.id]),delete r[c.id],delete n[c.id]}return{bind:function(d,c){let p=c.program;a.uniformBlockBinding(d,p)},update:function(d,c){let p=r[d.id];p===void 0&&((function(v){let f=v.uniforms,g=0,x=16;for(let C=0,T=f.length;C<T;C++){let A=Array.isArray(f[C])?f[C]:[f[C]];for(let F=0,L=A.length;F<L;F++){let B=A[F],G=Array.isArray(B.value)?B.value:[B.value];for(let R=0,X=G.length;R<X;R++){let W=h(G[R]),ae=g%x;ae!==0&&x-ae<W.boundary&&(g+=x-ae),B.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=g,g+=W.storage}}}let y=g%x;y>0&&(g+=x-y),v.__size=g,v.__cache={}})(d),p=(function(v){let f=(function(){for(let C=0;C<o;C++)if(s.indexOf(C)===-1)return s.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();v.__bindingPointIndex=f;let g=t.createBuffer(),x=v.__size,y=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,g),t.bufferData(t.UNIFORM_BUFFER,x,y),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,f,g),g})(d),r[d.id]=p,d.addEventListener("dispose",u));let m=c.program;a.updateUBOMapping(d,m);let _=e.render.frame;n[d.id]!==_&&((function(v){let f=r[v.id],g=v.uniforms,x=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,f);for(let y=0,C=g.length;y<C;y++){let T=Array.isArray(g[y])?g[y]:[g[y]];for(let A=0,F=T.length;A<F;A++){let L=T[A];if(l(L,y,A,x)===!0){let B=L.__offset,G=Array.isArray(L.value)?L.value:[L.value],R=0;for(let X=0;X<G.length;X++){let W=G[X],ae=h(W);typeof W=="number"||typeof W=="boolean"?(L.__data[0]=W,t.bufferSubData(t.UNIFORM_BUFFER,B+R,L.__data)):W.isMatrix3?(L.__data[0]=W.elements[0],L.__data[1]=W.elements[1],L.__data[2]=W.elements[2],L.__data[3]=0,L.__data[4]=W.elements[3],L.__data[5]=W.elements[4],L.__data[6]=W.elements[5],L.__data[7]=0,L.__data[8]=W.elements[6],L.__data[9]=W.elements[7],L.__data[10]=W.elements[8],L.__data[11]=0):(W.toArray(L.__data,R),R+=ae.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,B,L.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)})(d),n[d.id]=_)},dispose:function(){for(let d in r)t.deleteBuffer(r[d]);s=[],r={},n={}}}}var ih=class{constructor(t={}){let{canvas:e=uu(),context:i=null,depth:a=!0,stencil:r=!0,alpha:n=!1,antialias:s=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t,d;this.isWebGLRenderer=!0,d=i!==null?i.getContextAttributes().alpha:n;let c=new Uint32Array(4),p=new Int32Array(4),m=null,_=null,v=[],f=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=je,this._useLegacyLights=!1,this.toneMapping=jt,this.toneMappingExposure=1;let g=this,x=!1,y=0,C=0,T=null,A=-1,F=null,L=new et,B=new et,G=null,R=new Ue(0),X=0,W=e.width,ae=e.height,ce=1,ne=null,q=null,J=new et(0,0,W,ae),z=new et(0,0,W,ae),$=!1,le=new ds,M=!1,S=!1,N=null,te=new Pe,P=new se,O=new w,U={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function D(){return T===null?ce:1}let I,Q,Z,E,K,H,j,ie,ue,de,pe,xe,me,Le,fe,be,He,_e,Fe,De,Vr,ot,Ot,Ni,k=i;function gr(b,V){for(let Y=0;Y<b.length;Y++){let re=b[Y],ee=e.getContext(re,V);if(ee!==null)return ee}return null}try{let b={alpha:!0,depth:a,stencil:r,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r161"),e.addEventListener("webglcontextlost",vs,!1),e.addEventListener("webglcontextrestored",xs,!1),e.addEventListener("webglcontextcreationerror",ys,!1),k===null){let V=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&V.shift(),k=gr(V,b),k===null)throw gr(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&k instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}function di(){I=new Gu(k),Q=new Ou(k,I,t),I.init(Q),ot=new ud(k,I,Q),Z=new ld(k,I,Q),E=new Wu(k),K=new Jc,H=new hd(k,I,Z,K,Q,ot,E),j=new zu(g),ie=new Hu(g),ue=new Nu(k,Q),Ot=new Du(k,I,ue,Q),de=new Vu(k,ue,E,Ot),pe=new Yu(k,de,ue,E),Fe=new ju(k,Q,H),be=new Fu(K),xe=new Kc(g,j,ie,I,Q,Ot,be),me=new md(g,K),Le=new Qc,fe=new ad(I,Q),_e=new Uu(g,j,ie,Z,pe,d,o),He=new od(g,pe,Q),Ni=new gd(k,E,Q,Z),De=new Iu(k,I,E,Q),Vr=new ku(k,I,E,Q),E.programs=xe.programs,g.capabilities=Q,g.extensions=I,g.properties=K,g.renderLists=Le,g.shadowMap=He,g.state=Z,g.info=E}di();let Ye=new fd(g,k);function vs(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function xs(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;let b=E.autoReset,V=He.enabled,Y=He.autoUpdate,re=He.needsUpdate,ee=He.type;di(),E.autoReset=b,He.enabled=V,He.autoUpdate=Y,He.needsUpdate=re,He.type=ee}function ys(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Ss(b){let V=b.target;V.removeEventListener("dispose",Ss),(function(Y){(function(re){let ee=K.get(re).programs;ee!==void 0&&(ee.forEach((function(he){xe.releaseProgram(he)})),re.isShaderMaterial&&xe.releaseShaderCache(re))})(Y),K.remove(Y)})(V)}function Ms(b,V,Y){b.transparent===!0&&b.side===2&&b.forceSinglePass===!1?(b.side=lt,b.needsUpdate=!0,Wr(b,V,Y),b.side=ni,b.needsUpdate=!0,Wr(b,V,Y),b.side=2):Wr(b,V,Y)}this.xr=Ye,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let b=I.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=I.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(b){b!==void 0&&(ce=b,this.setSize(W,ae,!1))},this.getSize=function(b){return b.set(W,ae)},this.setSize=function(b,V,Y=!0){Ye.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(W=b,ae=V,e.width=Math.floor(b*ce),e.height=Math.floor(V*ce),Y===!0&&(e.style.width=b+"px",e.style.height=V+"px"),this.setViewport(0,0,b,V))},this.getDrawingBufferSize=function(b){return b.set(W*ce,ae*ce).floor()},this.setDrawingBufferSize=function(b,V,Y){W=b,ae=V,ce=Y,e.width=Math.floor(b*Y),e.height=Math.floor(V*Y),this.setViewport(0,0,b,V)},this.getCurrentViewport=function(b){return b.copy(L)},this.getViewport=function(b){return b.copy(J)},this.setViewport=function(b,V,Y,re){b.isVector4?J.set(b.x,b.y,b.z,b.w):J.set(b,V,Y,re),Z.viewport(L.copy(J).multiplyScalar(ce).floor())},this.getScissor=function(b){return b.copy(z)},this.setScissor=function(b,V,Y,re){b.isVector4?z.set(b.x,b.y,b.z,b.w):z.set(b,V,Y,re),Z.scissor(B.copy(z).multiplyScalar(ce).floor())},this.getScissorTest=function(){return $},this.setScissorTest=function(b){Z.setScissorTest($=b)},this.setOpaqueSort=function(b){ne=b},this.setTransparentSort=function(b){q=b},this.getClearColor=function(b){return b.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor.apply(_e,arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha.apply(_e,arguments)},this.clear=function(b=!0,V=!0,Y=!0){let re=0;if(b){let ee=!1;if(T!==null){let he=T.texture.format;ee=he===Al||he===wl||he===bl}if(ee){let he=T.texture.type,ve=he===Ti||he===ri||he===hs||he===bi||he===El||he===Tl,ye=_e.getClearColor(),Te=_e.getClearAlpha(),we=ye.r,Re=ye.g,Ae=ye.b;ve?(c[0]=we,c[1]=Re,c[2]=Ae,c[3]=Te,k.clearBufferuiv(k.COLOR,0,c)):(p[0]=we,p[1]=Re,p[2]=Ae,p[3]=Te,k.clearBufferiv(k.COLOR,0,p))}else re|=k.COLOR_BUFFER_BIT}V&&(re|=k.DEPTH_BUFFER_BIT),Y&&(re|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vs,!1),e.removeEventListener("webglcontextrestored",xs,!1),e.removeEventListener("webglcontextcreationerror",ys,!1),Le.dispose(),fe.dispose(),K.dispose(),j.dispose(),ie.dispose(),pe.dispose(),Ot.dispose(),Ni.dispose(),xe.dispose(),Ye.dispose(),Ye.removeEventListener("sessionstart",Es),Ye.removeEventListener("sessionend",Ts),N&&(N.dispose(),N=null),pi.stop()},this.renderBufferDirect=function(b,V,Y,re,ee,he){V===null&&(V=U);let ve=ee.isMesh&&ee.matrixWorld.determinant()<0,ye=(function(Ve,wt,ht,Se,Ie){wt.isScene!==!0&&(wt=U),H.resetTextureUnits();let _r=wt.fog,kh=Se.isMeshStandardMaterial?wt.environment:null,Wh=T===null?g.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Zt,Xr=(Se.isMeshStandardMaterial?ie:j).get(Se.envMap||kh),Xh=Se.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,qh=!!ht.attributes.tangent&&(!!Se.normalMap||Se.anisotropy>0),jh=!!ht.morphAttributes.position,Yh=!!ht.morphAttributes.normal,Zh=!!ht.morphAttributes.color,Ps=jt;Se.toneMapped&&(T!==null&&T.isXRRenderTarget!==!0||(Ps=g.toneMapping));let Ls=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,Kh=Ls!==void 0?Ls.length:0,Ne=K.get(Se),Jh=_.state.lights;if(M===!0&&(S===!0||Ve!==F)){let ft=Ve===F&&Se.id===A;be.setState(Se,Ve,ft)}let yt=!1;Se.version===Ne.__version?Ne.needsLights&&Ne.lightsStateVersion!==Jh.state.version||Ne.outputColorSpace!==Wh||Ie.isBatchedMesh&&Ne.batching===!1?yt=!0:Ie.isBatchedMesh||Ne.batching!==!0?Ie.isInstancedMesh&&Ne.instancing===!1?yt=!0:Ie.isInstancedMesh||Ne.instancing!==!0?Ie.isSkinnedMesh&&Ne.skinning===!1?yt=!0:Ie.isSkinnedMesh||Ne.skinning!==!0?Ie.isInstancedMesh&&Ne.instancingColor===!0&&Ie.instanceColor===null||Ie.isInstancedMesh&&Ne.instancingColor===!1&&Ie.instanceColor!==null||Ne.envMap!==Xr||Se.fog===!0&&Ne.fog!==_r?yt=!0:Ne.numClippingPlanes===void 0||Ne.numClippingPlanes===be.numPlanes&&Ne.numIntersection===be.numIntersection?(Ne.vertexAlphas!==Xh||Ne.vertexTangents!==qh||Ne.morphTargets!==jh||Ne.morphNormals!==Yh||Ne.morphColors!==Zh||Ne.toneMapping!==Ps||Q.isWebGL2===!0&&Ne.morphTargetsCount!==Kh)&&(yt=!0):yt=!0:yt=!0:yt=!0:yt=!0:(yt=!0,Ne.__version=Se.version);let fi=Ne.currentProgram;yt===!0&&(fi=Wr(Se,wt,Ie));let Ns=!1,vr=!1,rn=!1,tt=fi.getUniforms(),mi=Ne.uniforms;if(Z.useProgram(fi.program)&&(Ns=!0,vr=!0,rn=!0),Se.id!==A&&(A=Se.id,vr=!0),Ns||F!==Ve){tt.setValue(k,"projectionMatrix",Ve.projectionMatrix),tt.setValue(k,"viewMatrix",Ve.matrixWorldInverse);let ft=tt.map.cameraPosition;ft!==void 0&&ft.setValue(k,O.setFromMatrixPosition(Ve.matrixWorld)),Q.logarithmicDepthBuffer&&tt.setValue(k,"logDepthBufFC",2/(Math.log(Ve.far+1)/Math.LN2)),(Se.isMeshPhongMaterial||Se.isMeshToonMaterial||Se.isMeshLambertMaterial||Se.isMeshBasicMaterial||Se.isMeshStandardMaterial||Se.isShaderMaterial)&&tt.setValue(k,"isOrthographic",Ve.isOrthographicCamera===!0),F!==Ve&&(F=Ve,vr=!0,rn=!0)}if(Ie.isSkinnedMesh){tt.setOptional(k,Ie,"bindMatrix"),tt.setOptional(k,Ie,"bindMatrixInverse");let ft=Ie.skeleton;ft&&(Q.floatVertexTextures?(ft.boneTexture===null&&ft.computeBoneTexture(),tt.setValue(k,"boneTexture",ft.boneTexture,H)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Ie.isBatchedMesh&&(tt.setOptional(k,Ie,"batchingTexture"),tt.setValue(k,"batchingTexture",Ie._matricesTexture,H));let an=ht.morphAttributes;(an.position!==void 0||an.normal!==void 0||an.color!==void 0&&Q.isWebGL2===!0)&&Fe.update(Ie,ht,fi),(vr||Ne.receiveShadow!==Ie.receiveShadow)&&(Ne.receiveShadow=Ie.receiveShadow,tt.setValue(k,"receiveShadow",Ie.receiveShadow)),Se.isMeshGouraudMaterial&&Se.envMap!==null&&(mi.envMap.value=Xr,mi.flipEnvMap.value=Xr.isCubeTexture&&Xr.isRenderTargetTexture===!1?-1:1),vr&&(tt.setValue(k,"toneMappingExposure",g.toneMappingExposure),Ne.needsLights&&(St=rn,(At=mi).ambientLightColor.needsUpdate=St,At.lightProbe.needsUpdate=St,At.directionalLights.needsUpdate=St,At.directionalLightShadows.needsUpdate=St,At.pointLights.needsUpdate=St,At.pointLightShadows.needsUpdate=St,At.spotLights.needsUpdate=St,At.spotLightShadows.needsUpdate=St,At.rectAreaLights.needsUpdate=St,At.hemisphereLights.needsUpdate=St),_r&&Se.fog===!0&&me.refreshFogUniforms(mi,_r),me.refreshMaterialUniforms(mi,Se,ce,ae,N),Ra.upload(k,Rs(Ne),mi,H));var At,St;if(Se.isShaderMaterial&&Se.uniformsNeedUpdate===!0&&(Ra.upload(k,Rs(Ne),mi,H),Se.uniformsNeedUpdate=!1),Se.isSpriteMaterial&&tt.setValue(k,"center",Ie.center),tt.setValue(k,"modelViewMatrix",Ie.modelViewMatrix),tt.setValue(k,"normalMatrix",Ie.normalMatrix),tt.setValue(k,"modelMatrix",Ie.matrixWorld),Se.isShaderMaterial||Se.isRawShaderMaterial){let ft=Se.uniformsGroups;for(let nn=0,$h=ft.length;nn<$h;nn++)if(Q.isWebGL2){let Us=ft[nn];Ni.update(Us,fi),Ni.bind(Us,fi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return fi})(b,V,Y,re,ee);Z.setMaterial(re,ve);let Te=Y.index,we=1;if(re.wireframe===!0){if(Te=de.getWireframeAttribute(Y),Te===void 0)return;we=2}let Re=Y.drawRange,Ae=Y.attributes.position,Ge=Re.start*we,xt=(Re.start+Re.count)*we;he!==null&&(Ge=Math.max(Ge,he.start*we),xt=Math.min(xt,(he.start+he.count)*we)),Te!==null?(Ge=Math.max(Ge,0),xt=Math.min(xt,Te.count)):Ae!=null&&(Ge=Math.max(Ge,0),xt=Math.min(xt,Ae.count));let bt=xt-Ge;if(bt<0||bt===1/0)return;let Kt;Ot.setup(ee,re,ye,Y,Te);let We=De;if(Te!==null&&(Kt=ue.get(Te),We=Vr,We.setIndex(Kt)),ee.isMesh)re.wireframe===!0?(Z.setLineWidth(re.wireframeLinewidth*D()),We.setMode(k.LINES)):We.setMode(k.TRIANGLES);else if(ee.isLine){let Ve=re.linewidth;Ve===void 0&&(Ve=1),Z.setLineWidth(Ve*D()),ee.isLineSegments?We.setMode(k.LINES):ee.isLineLoop?We.setMode(k.LINE_LOOP):We.setMode(k.LINE_STRIP)}else ee.isPoints?We.setMode(k.POINTS):ee.isSprite&&We.setMode(k.TRIANGLES);if(ee.isBatchedMesh)We.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else if(ee.isInstancedMesh)We.renderInstances(Ge,bt,ee.count);else if(Y.isInstancedBufferGeometry){let Ve=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,wt=Math.min(Y.instanceCount,Ve);We.renderInstances(Ge,bt,wt)}else We.render(Ge,bt)},this.compile=function(b,V,Y=null){Y===null&&(Y=b),_=fe.get(Y),_.init(),f.push(_),Y.traverseVisible((function(ee){ee.isLight&&ee.layers.test(V.layers)&&(_.pushLight(ee),ee.castShadow&&_.pushShadow(ee))})),b!==Y&&b.traverseVisible((function(ee){ee.isLight&&ee.layers.test(V.layers)&&(_.pushLight(ee),ee.castShadow&&_.pushShadow(ee))})),_.setupLights(g._useLegacyLights);let re=new Set;return b.traverse((function(ee){let he=ee.material;if(he)if(Array.isArray(he))for(let ve=0;ve<he.length;ve++){let ye=he[ve];Ms(ye,Y,ee),re.add(ye)}else Ms(he,Y,ee),re.add(he)})),f.pop(),_=null,re},this.compileAsync=function(b,V,Y=null){let re=this.compile(b,V,Y);return new Promise((ee=>{function he(){re.forEach((function(ve){K.get(ve).currentProgram.isReady()&&re.delete(ve)})),re.size!==0?setTimeout(he,10):ee(b)}I.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)}))};let tn=null;function Es(){pi.stop()}function Ts(){pi.start()}let pi=new Yl;function bs(b,V,Y,re){if(b.visible===!1)return;if(b.layers.test(V.layers)){if(b.isGroup)Y=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(V);else if(b.isLight)_.pushLight(b),b.castShadow&&_.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||le.intersectsSprite(b)){re&&O.setFromMatrixPosition(b.matrixWorld).applyMatrix4(te);let he=pe.update(b),ve=b.material;ve.visible&&m.push(b,he,ve,Y,O.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||le.intersectsObject(b))){let he=pe.update(b),ve=b.material;if(re&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),O.copy(b.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),O.copy(he.boundingSphere.center)),O.applyMatrix4(b.matrixWorld).applyMatrix4(te)),Array.isArray(ve)){let ye=he.groups;for(let Te=0,we=ye.length;Te<we;Te++){let Re=ye[Te],Ae=ve[Re.materialIndex];Ae&&Ae.visible&&m.push(b,he,Ae,Y,O.z,Re)}}else ve.visible&&m.push(b,he,ve,Y,O.z,null)}}let ee=b.children;for(let he=0,ve=ee.length;he<ve;he++)bs(ee[he],V,Y,re)}function ws(b,V,Y,re){let ee=b.opaque,he=b.transmissive,ve=b.transparent;_.setupLightsView(Y),M===!0&&be.setGlobalState(g.clippingPlanes,Y),he.length>0&&(function(ye,Te,we,Re){if((we.isScene===!0?we.overrideMaterial:null)!==null)return;let Ae=Q.isWebGL2;N===null&&(N=new Ci(1,1,{generateMipmaps:!0,type:I.has("EXT_color_buffer_half_float")?Ir:Ti,minFilter:Qi,samples:Ae?4:0})),g.getDrawingBufferSize(P),Ae?N.setSize(P.x,P.y):N.setSize(Ha(P.x),Ha(P.y));let Ge=g.getRenderTarget();g.setRenderTarget(N),g.getClearColor(R),X=g.getClearAlpha(),X<1&&g.setClearColor(16777215,.5),g.clear();let xt=g.toneMapping;g.toneMapping=jt,kr(ye,we,Re),H.updateMultisampleRenderTarget(N),H.updateRenderTargetMipmap(N);let bt=!1;for(let Kt=0,We=Te.length;Kt<We;Kt++){let Ve=Te[Kt],wt=Ve.object,ht=Ve.geometry,Se=Ve.material,Ie=Ve.group;if(Se.side===2&&wt.layers.test(Re.layers)){let _r=Se.side;Se.side=lt,Se.needsUpdate=!0,As(wt,we,Re,ht,Se,Ie),Se.side=_r,Se.needsUpdate=!0,bt=!0}}bt===!0&&(H.updateMultisampleRenderTarget(N),H.updateRenderTargetMipmap(N)),g.setRenderTarget(Ge),g.setClearColor(R,X),g.toneMapping=xt})(ee,he,V,Y),re&&Z.viewport(L.copy(re)),ee.length>0&&kr(ee,V,Y),he.length>0&&kr(he,V,Y),ve.length>0&&kr(ve,V,Y),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function kr(b,V,Y){let re=V.isScene===!0?V.overrideMaterial:null;for(let ee=0,he=b.length;ee<he;ee++){let ve=b[ee],ye=ve.object,Te=ve.geometry,we=re===null?ve.material:re,Re=ve.group;ye.layers.test(Y.layers)&&As(ye,V,Y,Te,we,Re)}}function As(b,V,Y,re,ee,he){b.onBeforeRender(g,V,Y,re,ee,he),b.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),ee.onBeforeRender(g,V,Y,re,b,he),ee.transparent===!0&&ee.side===2&&ee.forceSinglePass===!1?(ee.side=lt,ee.needsUpdate=!0,g.renderBufferDirect(Y,V,re,ee,b,he),ee.side=ni,ee.needsUpdate=!0,g.renderBufferDirect(Y,V,re,ee,b,he),ee.side=2):g.renderBufferDirect(Y,V,re,ee,b,he),b.onAfterRender(g,V,Y,re,ee,he)}function Wr(b,V,Y){V.isScene!==!0&&(V=U);let re=K.get(b),ee=_.state.lights,he=_.state.shadowsArray,ve=ee.state.version,ye=xe.getParameters(b,ee.state,he,V,Y),Te=xe.getProgramCacheKey(ye),we=re.programs;re.environment=b.isMeshStandardMaterial?V.environment:null,re.fog=V.fog,re.envMap=(b.isMeshStandardMaterial?ie:j).get(b.envMap||re.environment),we===void 0&&(b.addEventListener("dispose",Ss),we=new Map,re.programs=we);let Re=we.get(Te);if(Re!==void 0){if(re.currentProgram===Re&&re.lightsStateVersion===ve)return Cs(b,ye),Re}else ye.uniforms=xe.getUniforms(b),b.onBuild(Y,ye,g),b.onBeforeCompile(ye,g),Re=xe.acquireProgram(ye,Te),we.set(Te,Re),re.uniforms=ye.uniforms;let Ae=re.uniforms;return(b.isShaderMaterial||b.isRawShaderMaterial)&&b.clipping!==!0||(Ae.clippingPlanes=be.uniform),Cs(b,ye),re.needsLights=(function(Ge){return Ge.isMeshLambertMaterial||Ge.isMeshToonMaterial||Ge.isMeshPhongMaterial||Ge.isMeshStandardMaterial||Ge.isShadowMaterial||Ge.isShaderMaterial&&Ge.lights===!0})(b),re.lightsStateVersion=ve,re.needsLights&&(Ae.ambientLightColor.value=ee.state.ambient,Ae.lightProbe.value=ee.state.probe,Ae.directionalLights.value=ee.state.directional,Ae.directionalLightShadows.value=ee.state.directionalShadow,Ae.spotLights.value=ee.state.spot,Ae.spotLightShadows.value=ee.state.spotShadow,Ae.rectAreaLights.value=ee.state.rectArea,Ae.ltc_1.value=ee.state.rectAreaLTC1,Ae.ltc_2.value=ee.state.rectAreaLTC2,Ae.pointLights.value=ee.state.point,Ae.pointLightShadows.value=ee.state.pointShadow,Ae.hemisphereLights.value=ee.state.hemi,Ae.directionalShadowMap.value=ee.state.directionalShadowMap,Ae.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,Ae.spotShadowMap.value=ee.state.spotShadowMap,Ae.spotLightMatrix.value=ee.state.spotLightMatrix,Ae.spotLightMap.value=ee.state.spotLightMap,Ae.pointShadowMap.value=ee.state.pointShadowMap,Ae.pointShadowMatrix.value=ee.state.pointShadowMatrix),re.currentProgram=Re,re.uniformsList=null,Re}function Rs(b){if(b.uniformsList===null){let V=b.currentProgram.getUniforms();b.uniformsList=Ra.seqWithValue(V.seq,b.uniforms)}return b.uniformsList}function Cs(b,V){let Y=K.get(b);Y.outputColorSpace=V.outputColorSpace,Y.batching=V.batching,Y.instancing=V.instancing,Y.instancingColor=V.instancingColor,Y.skinning=V.skinning,Y.morphTargets=V.morphTargets,Y.morphNormals=V.morphNormals,Y.morphColors=V.morphColors,Y.morphTargetsCount=V.morphTargetsCount,Y.numClippingPlanes=V.numClippingPlanes,Y.numIntersection=V.numClipIntersection,Y.vertexAlphas=V.vertexAlphas,Y.vertexTangents=V.vertexTangents,Y.toneMapping=V.toneMapping}pi.setAnimationLoop((function(b){tn&&tn(b)})),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(b){tn=b,Ye.setAnimationLoop(b),b===null?pi.stop():pi.start()},Ye.addEventListener("sessionstart",Es),Ye.addEventListener("sessionend",Ts),this.render=function(b,V){if(V!==void 0&&V.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(x===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Ye.enabled===!0&&Ye.isPresenting===!0&&(Ye.cameraAutoUpdate===!0&&Ye.updateCamera(V),V=Ye.getCamera()),b.isScene===!0&&b.onBeforeRender(g,b,V,T),_=fe.get(b,f.length),_.init(),f.push(_),te.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),le.setFromProjectionMatrix(te),S=this.localClippingEnabled,M=be.init(this.clippingPlanes,S),m=Le.get(b,v.length),m.init(),v.push(m),bs(b,V,0,g.sortObjects),m.finish(),g.sortObjects===!0&&m.sort(ne,q),this.info.render.frame++,M===!0&&be.beginShadows();let Y=_.state.shadowsArray;if(He.render(Y,b,V),M===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ye.enabled!==!1&&Ye.isPresenting!==!1&&Ye.hasDepthSensing()!==!1||_e.render(m,b),_.setupLights(g._useLegacyLights),V.isArrayCamera){let re=V.cameras;for(let ee=0,he=re.length;ee<he;ee++){let ve=re[ee];ws(m,b,ve,ve.viewport)}}else ws(m,b,V);T!==null&&(H.updateMultisampleRenderTarget(T),H.updateRenderTargetMipmap(T)),b.isScene===!0&&b.onAfterRender(g,b,V),Ot.resetDefaultState(),A=-1,F=null,f.pop(),_=f.length>0?f[f.length-1]:null,v.pop(),m=v.length>0?v[v.length-1]:null},this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(b,V,Y){K.get(b.texture).__webglTexture=V,K.get(b.depthTexture).__webglTexture=Y;let re=K.get(b);re.__hasExternalTextures=!0,re.__hasExternalTextures&&(re.__autoAllocateDepthBuffer=Y===void 0,re.__autoAllocateDepthBuffer||I.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),re.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,V){let Y=K.get(b);Y.__webglFramebuffer=V,Y.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(b,V=0,Y=0){T=b,y=V,C=Y;let re=!0,ee=null,he=!1,ve=!1;if(b){let ye=K.get(b);ye.__useDefaultFramebuffer!==void 0?(Z.bindFramebuffer(k.FRAMEBUFFER,null),re=!1):ye.__webglFramebuffer===void 0?H.setupRenderTarget(b):ye.__hasExternalTextures&&H.rebindTextures(b,K.get(b.texture).__webglTexture,K.get(b.depthTexture).__webglTexture);let Te=b.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ve=!0);let we=K.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(ee=Array.isArray(we[V])?we[V][Y]:we[V],he=!0):ee=Q.isWebGL2&&b.samples>0&&H.useMultisampledRTT(b)===!1?K.get(b).__webglMultisampledFramebuffer:Array.isArray(we)?we[Y]:we,L.copy(b.viewport),B.copy(b.scissor),G=b.scissorTest}else L.copy(J).multiplyScalar(ce).floor(),B.copy(z).multiplyScalar(ce).floor(),G=$;if(Z.bindFramebuffer(k.FRAMEBUFFER,ee)&&Q.drawBuffers&&re&&Z.drawBuffers(b,ee),Z.viewport(L),Z.scissor(B),Z.setScissorTest(G),he){let ye=K.get(b.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+V,ye.__webglTexture,Y)}else if(ve){let ye=K.get(b.texture),Te=V||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,ye.__webglTexture,Y||0,Te)}A=-1},this.readRenderTargetPixels=function(b,V,Y,re,ee,he,ve){if(!b||!b.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=K.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){Z.bindFramebuffer(k.FRAMEBUFFER,ye);try{let Te=b.texture,we=Te.format,Re=Te.type;if(we!==Lt&&ot.convert(we)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_FORMAT))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");let Ae=Re===Ir&&(I.has("EXT_color_buffer_half_float")||Q.isWebGL2&&I.has("EXT_color_buffer_float"));if(!(Re===Ti||ot.convert(Re)===k.getParameter(k.IMPLEMENTATION_COLOR_READ_TYPE)||Re===Xt&&(Q.isWebGL2||I.has("OES_texture_float")||I.has("WEBGL_color_buffer_float"))||Ae))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");V>=0&&V<=b.width-re&&Y>=0&&Y<=b.height-ee&&k.readPixels(V,Y,re,ee,ot.convert(we),ot.convert(Re),he)}finally{let Te=T!==null?K.get(T).__webglFramebuffer:null;Z.bindFramebuffer(k.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(b,V,Y=0){let re=Math.pow(2,-Y),ee=Math.floor(V.image.width*re),he=Math.floor(V.image.height*re);H.setTexture2D(V,0),k.copyTexSubImage2D(k.TEXTURE_2D,Y,0,0,b.x,b.y,ee,he),Z.unbindTexture()},this.copyTextureToTexture=function(b,V,Y,re=0){let ee=V.image.width,he=V.image.height,ve=ot.convert(Y.format),ye=ot.convert(Y.type);H.setTexture2D(Y,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,Y.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,Y.unpackAlignment),V.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,re,b.x,b.y,ee,he,ve,ye,V.image.data):V.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,re,b.x,b.y,V.mipmaps[0].width,V.mipmaps[0].height,ve,V.mipmaps[0].data):k.texSubImage2D(k.TEXTURE_2D,re,b.x,b.y,ve,ye,V.image),re===0&&Y.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),Z.unbindTexture()},this.copyTextureToTexture3D=function(b,V,Y,re,ee=0){if(g.isWebGL1Renderer)return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");let he=b.max.x-b.min.x+1,ve=b.max.y-b.min.y+1,ye=b.max.z-b.min.z+1,Te=ot.convert(re.format),we=ot.convert(re.type),Re;if(re.isData3DTexture)H.setTexture3D(re,0),Re=k.TEXTURE_3D;else{if(!re.isDataArrayTexture&&!re.isCompressedArrayTexture)return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");H.setTexture2DArray(re,0),Re=k.TEXTURE_2D_ARRAY}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,re.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,re.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,re.unpackAlignment);let Ae=k.getParameter(k.UNPACK_ROW_LENGTH),Ge=k.getParameter(k.UNPACK_IMAGE_HEIGHT),xt=k.getParameter(k.UNPACK_SKIP_PIXELS),bt=k.getParameter(k.UNPACK_SKIP_ROWS),Kt=k.getParameter(k.UNPACK_SKIP_IMAGES),We=Y.isCompressedTexture?Y.mipmaps[ee]:Y.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,We.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,We.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,b.min.x),k.pixelStorei(k.UNPACK_SKIP_ROWS,b.min.y),k.pixelStorei(k.UNPACK_SKIP_IMAGES,b.min.z),Y.isDataTexture||Y.isData3DTexture?k.texSubImage3D(Re,ee,V.x,V.y,V.z,he,ve,ye,Te,we,We.data):Y.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),k.compressedTexSubImage3D(Re,ee,V.x,V.y,V.z,he,ve,ye,Te,We.data)):k.texSubImage3D(Re,ee,V.x,V.y,V.z,he,ve,ye,Te,we,We),k.pixelStorei(k.UNPACK_ROW_LENGTH,Ae),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ge),k.pixelStorei(k.UNPACK_SKIP_PIXELS,xt),k.pixelStorei(k.UNPACK_SKIP_ROWS,bt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Kt),ee===0&&re.generateMipmaps&&k.generateMipmap(Re),Z.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?H.setTextureCube(b,0):b.isData3DTexture?H.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?H.setTexture2DArray(b,0):H.setTexture2D(b,0),Z.unbindTexture()},this.resetState=function(){y=0,C=0,T=null,Z.reset(),Ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===us?"display-p3":"srgb",e.unpackColorSpace=Oe.workingColorSpace===Ya?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===je?Ai:Cl}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Ai?je:Zt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},_d=class extends ih{};_d.prototype.isWebGL1Renderer=!0;var vd=class extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}},Cp=new w,Pp=new w,Lp=new w,Np=new w,Up=new se,Dp=new se,Ip=new Pe,Op=new w,Fp=new w,zp=new w,Bp=new se,Hp=new se,Gp=new se,Vp=new w,kp=new w,Wp=new w,Xp=new et,qp=new et,jp=new w,Yp=new Pe,Zp=new w,Kp=new ci,Jp=new Pe,$p=new Za,Qp=new Pe,ef=new Pe,tf=new Pe,rf=new Pe,af=new ui,nf=new Pe,sf=new Ze,of=new ci,xd=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e){let i=this.pool,a=this.list;this.index>=i.length&&i.push({start:-1,count:-1,z:-1});let r=i[this.index];a.push(r),this.index++,r.start=t.start,r.count=t.count,r.z=e}reset(){this.list.length=0,this.index=0}},lf=new Pe,hf=new Pe,uf=new Pe,cf=new Pe,df=new ds,pf=new ui,ff=new ci,mf=new w,gf=new xd,_f=new Ze,vf=new w,xf=new w,yf=new Pe,Sf=new Za,Mf=new ci,Ef=new w,Tf=new w,rh=class extends Hr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},el=new Pe,ts=new Za,pa=new ci,fa=new w,yd=class extends Ut{constructor(t=new Xe,e=new rh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,a=this.matrixWorld,r=t.params.Points.threshold,n=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),pa.copy(i.boundingSphere),pa.applyMatrix4(a),pa.radius+=r,t.ray.intersectsSphere(pa)===!1)return;el.copy(a).invert(),ts.copy(t.ray).applyMatrix4(el);let s=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s,l=i.index,h=i.attributes.position;if(l!==null)for(let u=Math.max(0,n.start),d=Math.min(l.count,n.start+n.count);u<d;u++){let c=l.getX(u);fa.fromBufferAttribute(h,c),tl(fa,c,o,a,t,e,this)}else for(let u=Math.max(0,n.start),d=Math.min(h.count,n.start+n.count);u<d;u++)fa.fromBufferAttribute(h,u),tl(fa,u,o,a,t,e,this)}updateMorphTargets(){let t=this.geometry.morphAttributes,e=Object.keys(t);if(e.length>0){let i=t[e[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){let n=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=a}}}}};function tl(t,e,i,a,r,n,s){let o=ts.distanceSqToPoint(t);if(o<i){let l=new w;ts.closestPointToPoint(t,l),l.applyMatrix4(a);let h=r.ray.origin.distanceTo(l);if(h<r.near||h>r.far)return;n.push({distance:h,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:s})}}var Sd=class extends _t{constructor(t,e,i,a,r,n,s,o,l){super(t,e,i,a,r,n,s,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},It=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,a=this.getPoint(0),r=0;e.push(0);for(let n=1;n<=t;n++)i=this.getPoint(n/t),r+=i.distanceTo(a),e.push(r),a=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),a=0,r=i.length,n;n=e||t*i[r-1];let s,o=0,l=r-1;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),s=i[a]-n,s<0)o=a+1;else{if(!(s>0)){l=a;break}l=a-1}if(a=l,i[a]===n)return a/(r-1);let h=i[a];return(a+(n-h)/(i[a+1]-h))/(r-1)}getTangent(t,e){let i=t-1e-4,a=t+1e-4;i<0&&(i=0),a>1&&(a=1);let r=this.getPoint(i),n=this.getPoint(a),s=e||(r.isVector2?new se:new w);return s.copy(n).sub(r).normalize(),s}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new w,a=[],r=[],n=[],s=new w,o=new Pe;for(let c=0;c<=t;c++){let p=c/t;a[c]=this.getTangentAt(p,new w)}r[0]=new w,n[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(a[0].x),u=Math.abs(a[0].y),d=Math.abs(a[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),d<=l&&i.set(0,0,1),s.crossVectors(a[0],i).normalize(),r[0].crossVectors(a[0],s),n[0].crossVectors(a[0],r[0]);for(let c=1;c<=t;c++){if(r[c]=r[c-1].clone(),n[c]=n[c-1].clone(),s.crossVectors(a[c-1],a[c]),s.length()>Number.EPSILON){s.normalize();let p=Math.acos(Qe(a[c-1].dot(a[c]),-1,1));r[c].applyMatrix4(o.makeRotationAxis(s,p))}n[c].crossVectors(a[c],r[c])}if(e===!0){let c=Math.acos(Qe(r[0].dot(r[t]),-1,1));c/=t,a[0].dot(s.crossVectors(r[0],r[t]))>0&&(c=-c);for(let p=1;p<=t;p++)r[p].applyMatrix4(o.makeRotationAxis(a[p],c*p)),n[p].crossVectors(a[p],r[p])}return{tangents:a,normals:r,binormals:n}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},fs=class extends It{constructor(t=0,e=0,i=1,a=1,r=0,n=2*Math.PI,s=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=a,this.aStartAngle=r,this.aEndAngle=n,this.aClockwise=s,this.aRotation=o}getPoint(t,e){let i=e||new se,a=2*Math.PI,r=this.aEndAngle-this.aStartAngle,n=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=a;for(;r>a;)r-=a;r<Number.EPSILON&&(r=n?0:a),this.aClockwise!==!0||n||(r===a?r=-a:r-=a);let s=this.aStartAngle+t*r,o=this.aX+this.xRadius*Math.cos(s),l=this.aY+this.yRadius*Math.sin(s);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=o-this.aX,c=l-this.aY;o=d*h-c*u+this.aX,l=d*u+c*h+this.aY}return i.set(o,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Md=class extends fs{constructor(t,e,i,a,r,n){super(t,e,i,i,a,r,n),this.isArcCurve=!0,this.type="ArcCurve"}};function ms(){let t=0,e=0,i=0,a=0;function r(n,s,o,l){t=n,e=o,i=-3*n+3*s-2*o-l,a=2*n-2*s+o+l}return{initCatmullRom:function(n,s,o,l,h){r(s,o,h*(o-n),h*(l-s))},initNonuniformCatmullRom:function(n,s,o,l,h,u,d){let c=(s-n)/h-(o-n)/(h+u)+(o-s)/u,p=(o-s)/u-(l-s)/(u+d)+(l-o)/d;c*=u,p*=u,r(s,o,c,p)},calc:function(n){let s=n*n;return t+e*n+i*s+a*(s*n)}}}var ma=new w,On=new ms,Fn=new ms,zn=new ms,Ed=class extends It{constructor(t=[],e=!1,i="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=a}getPoint(t,e=new w){let i=e,a=this.points,r=a.length,n=(r-(this.closed?0:1))*t,s,o,l=Math.floor(n),h=n-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/r)+1)*r:h===0&&l===r-1&&(l=r-2,h=1),this.closed||l>0?s=a[(l-1)%r]:(ma.subVectors(a[0],a[1]).add(a[0]),s=ma);let u=a[l%r],d=a[(l+1)%r];if(this.closed||l+2<r?o=a[(l+2)%r]:(ma.subVectors(a[r-1],a[r-2]).add(a[r-1]),o=ma),this.curveType==="centripetal"||this.curveType==="chordal"){let c=this.curveType==="chordal"?.5:.25,p=Math.pow(s.distanceToSquared(u),c),m=Math.pow(u.distanceToSquared(d),c),_=Math.pow(d.distanceToSquared(o),c);m<1e-4&&(m=1),p<1e-4&&(p=m),_<1e-4&&(_=m),On.initNonuniformCatmullRom(s.x,u.x,d.x,o.x,p,m,_),Fn.initNonuniformCatmullRom(s.y,u.y,d.y,o.y,p,m,_),zn.initNonuniformCatmullRom(s.z,u.z,d.z,o.z,p,m,_)}else this.curveType==="catmullrom"&&(On.initCatmullRom(s.x,u.x,d.x,o.x,this.tension),Fn.initCatmullRom(s.y,u.y,d.y,o.y,this.tension),zn.initCatmullRom(s.z,u.z,d.z,o.z,this.tension));return i.set(On.calc(h),Fn.calc(h),zn.calc(h)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let a=t.points[e];this.points.push(a.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let a=this.points[e];t.points.push(a.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let a=t.points[e];this.points.push(new w().fromArray(a))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function il(t,e,i,a,r){let n=.5*(a-e),s=.5*(r-i),o=t*t;return(2*i-2*a+n+s)*(t*o)+(-3*i+3*a-2*n-s)*o+n*t+i}function Pr(t,e,i,a){return(function(r,n){let s=1-r;return s*s*n})(t,e)+(function(r,n){return 2*(1-r)*r*n})(t,i)+(function(r,n){return r*r*n})(t,a)}function Lr(t,e,i,a,r){return(function(n,s){let o=1-n;return o*o*o*s})(t,e)+(function(n,s){let o=1-n;return 3*o*o*n*s})(t,i)+(function(n,s){return 3*(1-n)*n*n*s})(t,a)+(function(n,s){return n*n*n*s})(t,r)}var ah=class extends It{constructor(t=new se,e=new se,i=new se,a=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=a}getPoint(t,e=new se){let i=e,a=this.v0,r=this.v1,n=this.v2,s=this.v3;return i.set(Lr(t,a.x,r.x,n.x,s.x),Lr(t,a.y,r.y,n.y,s.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Td=class extends It{constructor(t=new w,e=new w,i=new w,a=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=a}getPoint(t,e=new w){let i=e,a=this.v0,r=this.v1,n=this.v2,s=this.v3;return i.set(Lr(t,a.x,r.x,n.x,s.x),Lr(t,a.y,r.y,n.y,s.y),Lr(t,a.z,r.z,n.z,s.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},nh=class extends It{constructor(t=new se,e=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new se){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new se){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},bd=class extends It{constructor(t=new w,e=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new w){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new w){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},sh=class extends It{constructor(t=new se,e=new se,i=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new se){let i=e,a=this.v0,r=this.v1,n=this.v2;return i.set(Pr(t,a.x,r.x,n.x),Pr(t,a.y,r.y,n.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},oh=class extends It{constructor(t=new w,e=new w,i=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new w){let i=e,a=this.v0,r=this.v1,n=this.v2;return i.set(Pr(t,a.x,r.x,n.x),Pr(t,a.y,r.y,n.y),Pr(t,a.z,r.z,n.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},lh=class extends It{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new se){let i=e,a=this.points,r=(a.length-1)*t,n=Math.floor(r),s=r-n,o=a[n===0?n:n-1],l=a[n],h=a[n>a.length-2?a.length-1:n+1],u=a[n>a.length-3?a.length-1:n+2];return i.set(il(s,o.x,l.x,h.x,u.x),il(s,o.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let a=t.points[e];this.points.push(a.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let a=this.points[e];t.points.push(a.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let a=t.points[e];this.points.push(new se().fromArray(a))}return this}},Va=Object.freeze({__proto__:null,ArcCurve:Md,CatmullRomCurve3:Ed,CubicBezierCurve:ah,CubicBezierCurve3:Td,EllipseCurve:fs,LineCurve:nh,LineCurve3:bd,QuadraticBezierCurve:sh,QuadraticBezierCurve3:oh,SplineCurve:lh}),wd=class extends It{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Va[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),a=this.getCurveLengths(),r=0;for(;r<a.length;){if(a[r]>=i){let n=a[r]-i,s=this.curves[r],o=s.getLength(),l=o===0?0:1-n/o;return s.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,a=this.curves.length;i<a;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let a=0,r=this.curves;a<r.length;a++){let n=r[a],s=n.isEllipseCurve?2*t:n.isLineCurve||n.isLineCurve3?1:n.isSplineCurve?t*n.points.length:t,o=n.getPoints(s);for(let l=0;l<o.length;l++){let h=o[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let a=t.curves[e];this.curves.push(a.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let a=this.curves[e];t.curves.push(a.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let a=t.curves[e];this.curves.push(new Va[a.type]().fromJSON(a))}return this}},is=class extends wd{constructor(t){super(),this.type="Path",this.currentPoint=new se,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new nh(this.currentPoint.clone(),new se(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,a){let r=new sh(this.currentPoint.clone(),new se(t,e),new se(i,a));return this.curves.push(r),this.currentPoint.set(i,a),this}bezierCurveTo(t,e,i,a,r,n){let s=new ah(this.currentPoint.clone(),new se(t,e),new se(i,a),new se(r,n));return this.curves.push(s),this.currentPoint.set(r,n),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new lh(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,a,r,n){let s=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(t+s,e+o,i,a,r,n),this}absarc(t,e,i,a,r,n){return this.absellipse(t,e,i,i,a,r,n),this}ellipse(t,e,i,a,r,n,s,o){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,a,r,n,s,o),this}absellipse(t,e,i,a,r,n,s,o){let l=new fs(t,e,i,a,r,n,s,o);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},hh=class uh extends Xe{constructor(e=[new se(0,-.5),new se(.5,0),new se(0,.5)],i=12,a=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:i,phiStart:a,phiLength:r},i=Math.floor(i),r=Qe(r,0,2*Math.PI);let n=[],s=[],o=[],l=[],h=[],u=1/i,d=new w,c=new se,p=new w,m=new w,_=new w,v=0,f=0;for(let g=0;g<=e.length-1;g++)switch(g){case 0:v=e[g+1].x-e[g].x,f=e[g+1].y-e[g].y,p.x=1*f,p.y=-v,p.z=0*f,_.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:v=e[g+1].x-e[g].x,f=e[g+1].y-e[g].y,p.x=1*f,p.y=-v,p.z=0*f,m.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),l.push(p.x,p.y,p.z),_.copy(m)}for(let g=0;g<=i;g++){let x=a+g*u*r,y=Math.sin(x),C=Math.cos(x);for(let T=0;T<=e.length-1;T++){d.x=e[T].x*y,d.y=e[T].y,d.z=e[T].x*C,s.push(d.x,d.y,d.z),c.x=g/i,c.y=T/(e.length-1),o.push(c.x,c.y);let A=l[3*T+0]*y,F=l[3*T+1],L=l[3*T+0]*C;h.push(A,F,L)}}for(let g=0;g<i;g++)for(let x=0;x<e.length-1;x++){let y=x+g*e.length,C=y,T=y+e.length,A=y+e.length+1,F=y+1;n.push(C,T,F),n.push(A,F,T)}this.setIndex(n),this.setAttribute("position",new Me(s,3)),this.setAttribute("uv",new Me(o,2)),this.setAttribute("normal",new Me(h,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uh(e.points,e.segments,e.phiStart,e.phiLength)}},Ad=class ch extends hh{constructor(e=1,i=1,a=4,r=8){let n=new is;n.absarc(0,-i/2,e,1.5*Math.PI,0),n.absarc(0,i/2,e,0,.5*Math.PI),super(n.getPoints(a),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:i,capSegments:a,radialSegments:r}}static fromJSON(e){return new ch(e.radius,e.length,e.capSegments,e.radialSegments)}},Rd=class dh extends Xe{constructor(e=1,i=32,a=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:i,thetaStart:a,thetaLength:r},i=Math.max(3,i);let n=[],s=[],o=[],l=[],h=new w,u=new se;s.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,c=3;d<=i;d++,c+=3){let p=a+d/i*r;h.x=e*Math.cos(p),h.y=e*Math.sin(p),s.push(h.x,h.y,h.z),o.push(0,0,1),u.x=(s[c]/e+1)/2,u.y=(s[c+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=i;d++)n.push(d,d+1,0);this.setIndex(n),this.setAttribute("position",new Me(s,3)),this.setAttribute("normal",new Me(o,3)),this.setAttribute("uv",new Me(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dh(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ph=class fh extends Xe{constructor(e=1,i=1,a=1,r=32,n=1,s=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:i,height:a,radialSegments:r,heightSegments:n,openEnded:s,thetaStart:o,thetaLength:l};let h=this;r=Math.floor(r),n=Math.floor(n);let u=[],d=[],c=[],p=[],m=0,_=[],v=a/2,f=0;function g(x){let y=m,C=new se,T=new w,A=0,F=x===!0?e:i,L=x===!0?1:-1;for(let G=1;G<=r;G++)d.push(0,v*L,0),c.push(0,L,0),p.push(.5,.5),m++;let B=m;for(let G=0;G<=r;G++){let R=G/r*l+o,X=Math.cos(R),W=Math.sin(R);T.x=F*W,T.y=v*L,T.z=F*X,d.push(T.x,T.y,T.z),c.push(0,L,0),C.x=.5*X+.5,C.y=.5*W*L+.5,p.push(C.x,C.y),m++}for(let G=0;G<r;G++){let R=y+G,X=B+G;x===!0?u.push(X,X+1,R):u.push(X+1,X,R),A+=3}h.addGroup(f,A,x===!0?1:2),f+=A}(function(){let x=new w,y=new w,C=0,T=(i-e)/a;for(let A=0;A<=n;A++){let F=[],L=A/n,B=L*(i-e)+e;for(let G=0;G<=r;G++){let R=G/r,X=R*l+o,W=Math.sin(X),ae=Math.cos(X);y.x=B*W,y.y=-L*a+v,y.z=B*ae,d.push(y.x,y.y,y.z),x.set(W,T,ae).normalize(),c.push(x.x,x.y,x.z),p.push(R,1-L),F.push(m++)}_.push(F)}for(let A=0;A<r;A++)for(let F=0;F<n;F++){let L=_[F][A],B=_[F+1][A],G=_[F+1][A+1],R=_[F][A+1];u.push(L,B,R),u.push(B,G,R),C+=6}h.addGroup(f,C,0),f+=C})(),s===!1&&(e>0&&g(!0),i>0&&g(!1)),this.setIndex(u),this.setAttribute("position",new Me(d,3)),this.setAttribute("normal",new Me(c,3)),this.setAttribute("uv",new Me(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fh(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Cd=class mh extends ph{constructor(e=1,i=1,a=32,r=1,n=!1,s=0,o=2*Math.PI){super(0,e,i,a,r,n,s,o),this.type="ConeGeometry",this.parameters={radius:e,height:i,radialSegments:a,heightSegments:r,openEnded:n,thetaStart:s,thetaLength:o}}static fromJSON(e){return new mh(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Gr=class gh extends Xe{constructor(e=[],i=[],a=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:i,radius:a,detail:r};let n=[],s=[];function o(c,p,m,_){let v=_+1,f=[];for(let g=0;g<=v;g++){f[g]=[];let x=c.clone().lerp(m,g/v),y=p.clone().lerp(m,g/v),C=v-g;for(let T=0;T<=C;T++)f[g][T]=T===0&&g===v?x:x.clone().lerp(y,T/C)}for(let g=0;g<v;g++)for(let x=0;x<2*(v-g)-1;x++){let y=Math.floor(x/2);x%2==0?(l(f[g][y+1]),l(f[g+1][y]),l(f[g][y])):(l(f[g][y+1]),l(f[g+1][y+1]),l(f[g+1][y]))}}function l(c){n.push(c.x,c.y,c.z)}function h(c,p){let m=3*c;p.x=e[m+0],p.y=e[m+1],p.z=e[m+2]}function u(c,p,m,_){_<0&&c.x===1&&(s[p]=c.x-1),m.x===0&&m.z===0&&(s[p]=_/2/Math.PI+.5)}function d(c){return Math.atan2(c.z,-c.x)}(function(c){let p=new w,m=new w,_=new w;for(let v=0;v<i.length;v+=3)h(i[v+0],p),h(i[v+1],m),h(i[v+2],_),o(p,m,_,c)})(r),(function(c){let p=new w;for(let m=0;m<n.length;m+=3)p.x=n[m+0],p.y=n[m+1],p.z=n[m+2],p.normalize().multiplyScalar(c),n[m+0]=p.x,n[m+1]=p.y,n[m+2]=p.z})(a),(function(){let c=new w;for(let m=0;m<n.length;m+=3){c.x=n[m+0],c.y=n[m+1],c.z=n[m+2];let _=d(c)/2/Math.PI+.5,v=(p=c,Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))/Math.PI+.5);s.push(_,1-v)}var p;(function(){let m=new w,_=new w,v=new w,f=new w,g=new se,x=new se,y=new se;for(let C=0,T=0;C<n.length;C+=9,T+=6){m.set(n[C+0],n[C+1],n[C+2]),_.set(n[C+3],n[C+4],n[C+5]),v.set(n[C+6],n[C+7],n[C+8]),g.set(s[T+0],s[T+1]),x.set(s[T+2],s[T+3]),y.set(s[T+4],s[T+5]),f.copy(m).add(_).add(v).divideScalar(3);let A=d(f);u(g,T+0,m,A),u(x,T+2,_,A),u(y,T+4,v,A)}})(),(function(){for(let m=0;m<s.length;m+=6){let _=s[m+0],v=s[m+2],f=s[m+4],g=Math.max(_,v,f),x=Math.min(_,v,f);g>.9&&x<.1&&(_<.2&&(s[m+0]+=1),v<.2&&(s[m+2]+=1),f<.2&&(s[m+4]+=1))}})()})(),this.setAttribute("position",new Me(n,3)),this.setAttribute("normal",new Me(n.slice(),3)),this.setAttribute("uv",new Me(s,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gh(e.vertices,e.indices,e.radius,e.details)}},Pd=class _h extends Gr{constructor(e=1,i=0){let a=(1+Math.sqrt(5))/2,r=1/a;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-a,0,-r,a,0,r,-a,0,r,a,-r,-a,0,-r,a,0,r,-a,0,r,a,0,-a,0,-r,a,0,-r,-a,0,r,a,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,i),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:i}}static fromJSON(e){return new _h(e.radius,e.detail)}},ga=new w,_a=new w,Bn=new w,va=new Ar,Ld=class extends Xe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),a=Math.cos(rr*e),r=t.getIndex(),n=t.getAttribute("position"),s=r?r.count:n.count,o=[0,0,0],l=["a","b","c"],h=new Array(3),u={},d=[];for(let c=0;c<s;c+=3){r?(o[0]=r.getX(c),o[1]=r.getX(c+1),o[2]=r.getX(c+2)):(o[0]=c,o[1]=c+1,o[2]=c+2);let{a:p,b:m,c:_}=va;if(p.fromBufferAttribute(n,o[0]),m.fromBufferAttribute(n,o[1]),_.fromBufferAttribute(n,o[2]),va.getNormal(Bn),h[0]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,h[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,h[2]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,h[0]!==h[1]&&h[1]!==h[2]&&h[2]!==h[0])for(let v=0;v<3;v++){let f=(v+1)%3,g=h[v],x=h[f],y=va[l[v]],C=va[l[f]],T=`${g}_${x}`,A=`${x}_${g}`;A in u&&u[A]?(Bn.dot(u[A].normal)<=a&&(d.push(y.x,y.y,y.z),d.push(C.x,C.y,C.z)),u[A]=null):T in u||(u[T]={index0:o[v],index1:o[f],normal:Bn.clone()})}}for(let c in u)if(u[c]){let{index0:p,index1:m}=u[c];ga.fromBufferAttribute(n,p),_a.fromBufferAttribute(n,m),d.push(ga.x,ga.y,ga.z),d.push(_a.x,_a.y,_a.z)}this.setAttribute("position",new Me(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},vh=class extends is{constructor(t){super(t),this.uuid=Li(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,a=this.holes.length;i<a;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let a=t.holes[e];this.holes.push(a.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let a=this.holes[e];t.holes.push(a.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let a=t.holes[e];this.holes.push(new is().fromJSON(a))}return this}},Nd=function(t,e,i=2){let a=e&&e.length,r=a?e[0]*i:t.length,n=rl(t,0,r,i,!0),s=[];if(!n||n.next===n.prev)return s;let o,l,h,u,d,c,p;if(a&&(n=(function(m,_,v,f){let g=[],x,y,C,T,A;for(x=0,y=_.length;x<y;x++)C=_[x]*f,T=x<y-1?_[x+1]*f:m.length,A=rl(m,C,T,f,!1),A===A.next&&(A.steiner=!0),g.push(Hd(A));for(g.sort(Fd),x=0;x<g.length;x++)v=zd(g[x],v);return v})(t,e,n,i)),t.length>80*i){o=h=t[0],l=u=t[1];for(let m=i;m<r;m+=i)d=t[m],c=t[m+1],d<o&&(o=d),c<l&&(l=c),d>h&&(h=d),c>u&&(u=c);p=Math.max(h-o,u-l),p=p!==0?32767/p:0}return Fr(n,s,i,o,l,p,0),s};function rl(t,e,i,a,r){let n,s;if(r===(function(o,l,h,u){let d=0;for(let c=l,p=h-u;c<h;c+=u)d+=(o[p]-o[c])*(o[c+1]+o[p+1]),p=c;return d})(t,e,i,a)>0)for(n=e;n<i;n+=a)s=al(n,t[n],t[n+1],s);else for(n=i-a;n>=e;n-=a)s=al(n,t[n],t[n+1],s);return s&&$a(s,s.next)&&(Br(s),s=s.next),s}function Pi(t,e){if(!t)return t;e||(e=t);let i,a=t;do if(i=!1,a.steiner||!$a(a,a.next)&&Be(a.prev,a,a.next)!==0)a=a.next;else{if(Br(a),a=e=a.prev,a===a.next)break;i=!0}while(i||a!==e);return e}function Fr(t,e,i,a,r,n,s){if(!t)return;!s&&n&&(function(u,d,c,p){let m=u;do m.z===0&&(m.z=rs(m.x,m.y,d,c,p)),m.prevZ=m.prev,m.nextZ=m.next,m=m.next;while(m!==u);m.prevZ.nextZ=null,m.prevZ=null,(function(_){let v,f,g,x,y,C,T,A,F=1;do{for(f=_,_=null,y=null,C=0;f;){for(C++,g=f,T=0,v=0;v<F&&(T++,g=g.nextZ,g);v++);for(A=F;T>0||A>0&&g;)T!==0&&(A===0||!g||f.z<=g.z)?(x=f,f=f.nextZ,T--):(x=g,g=g.nextZ,A--),y?y.nextZ=x:_=x,x.prevZ=y,y=x;f=g}y.nextZ=null,F*=2}while(C>1)})(m)})(t,a,r,n);let o,l,h=t;for(;t.prev!==t.next;)if(o=t.prev,l=t.next,n?Dd(t,a,r,n):Ud(t))e.push(o.i/i|0),e.push(t.i/i|0),e.push(l.i/i|0),Br(t),t=l.next,h=l.next;else if((t=l)===h){s?s===1?Fr(t=Id(Pi(t),e,i),e,i,a,r,n,2):s===2&&Od(t,e,i,a,r,n):Fr(Pi(t),e,i,a,r,n,1);break}}function Ud(t){let e=t.prev,i=t,a=t.next;if(Be(e,i,a)>=0)return!1;let r=e.x,n=i.x,s=a.x,o=e.y,l=i.y,h=a.y,u=r<n?r<s?r:s:n<s?n:s,d=o<l?o<h?o:h:l<h?l:h,c=r>n?r>s?r:s:n>s?n:s,p=o>l?o>h?o:h:l>h?l:h,m=a.next;for(;m!==e;){if(m.x>=u&&m.x<=c&&m.y>=d&&m.y<=p&&tr(r,o,n,l,s,h,m.x,m.y)&&Be(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Dd(t,e,i,a){let r=t.prev,n=t,s=t.next;if(Be(r,n,s)>=0)return!1;let o=r.x,l=n.x,h=s.x,u=r.y,d=n.y,c=s.y,p=o<l?o<h?o:h:l<h?l:h,m=u<d?u<c?u:c:d<c?d:c,_=o>l?o>h?o:h:l>h?l:h,v=u>d?u>c?u:c:d>c?d:c,f=rs(p,m,e,i,a),g=rs(_,v,e,i,a),x=t.prevZ,y=t.nextZ;for(;x&&x.z>=f&&y&&y.z<=g;){if(x.x>=p&&x.x<=_&&x.y>=m&&x.y<=v&&x!==r&&x!==s&&tr(o,u,l,d,h,c,x.x,x.y)&&Be(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=p&&y.x<=_&&y.y>=m&&y.y<=v&&y!==r&&y!==s&&tr(o,u,l,d,h,c,y.x,y.y)&&Be(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=f;){if(x.x>=p&&x.x<=_&&x.y>=m&&x.y<=v&&x!==r&&x!==s&&tr(o,u,l,d,h,c,x.x,x.y)&&Be(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=g;){if(y.x>=p&&y.x<=_&&y.y>=m&&y.y<=v&&y!==r&&y!==s&&tr(o,u,l,d,h,c,y.x,y.y)&&Be(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Id(t,e,i){let a=t;do{let r=a.prev,n=a.next.next;!$a(r,n)&&xh(r,a,a.next,n)&&zr(r,n)&&zr(n,r)&&(e.push(r.i/i|0),e.push(a.i/i|0),e.push(n.i/i|0),Br(a),Br(a.next),a=t=n),a=a.next}while(a!==t);return Pi(a)}function Od(t,e,i,a,r,n){let s=t;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&Gd(s,o)){let l=yh(s,o);return s=Pi(s,s.next),l=Pi(l,l.next),Fr(s,e,i,a,r,n,0),void Fr(l,e,i,a,r,n,0)}o=o.next}s=s.next}while(s!==t)}function Fd(t,e){return t.x-e.x}function zd(t,e){let i=(function(r,n){let s,o=n,l=-1/0,h=r.x,u=r.y;do{if(u<=o.y&&u>=o.next.y&&o.next.y!==o.y){let v=o.x+(u-o.y)*(o.next.x-o.x)/(o.next.y-o.y);if(v<=h&&v>l&&(l=v,s=o.x<o.next.x?o:o.next,v===h))return s}o=o.next}while(o!==n);if(!s)return null;let d=s,c=s.x,p=s.y,m,_=1/0;o=s;do h>=o.x&&o.x>=c&&h!==o.x&&tr(u<p?h:l,u,c,p,u<p?l:h,u,o.x,o.y)&&(m=Math.abs(u-o.y)/(h-o.x),zr(o,r)&&(m<_||m===_&&(o.x>s.x||o.x===s.x&&Bd(s,o)))&&(s=o,_=m)),o=o.next;while(o!==d);return s})(t,e);if(!i)return e;let a=yh(i,t);return Pi(a,a.next),Pi(i,i.next)}function Bd(t,e){return Be(t.prev,t,e.prev)<0&&Be(e.next,t,t.next)<0}function rs(t,e,i,a,r){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-i)*r|0)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-a)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Hd(t){let e=t,i=t;do(e.x<i.x||e.x===i.x&&e.y<i.y)&&(i=e),e=e.next;while(e!==t);return i}function tr(t,e,i,a,r,n,s,o){return(r-s)*(e-o)>=(t-s)*(n-o)&&(t-s)*(a-o)>=(i-s)*(e-o)&&(i-s)*(n-o)>=(r-s)*(a-o)}function Gd(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!(function(i,a){let r=i;do{if(r.i!==i.i&&r.next.i!==i.i&&r.i!==a.i&&r.next.i!==a.i&&xh(r,r.next,i,a))return!0;r=r.next}while(r!==i);return!1})(t,e)&&(zr(t,e)&&zr(e,t)&&(function(i,a){let r=i,n=!1,s=(i.x+a.x)/2,o=(i.y+a.y)/2;do r.y>o!=r.next.y>o&&r.next.y!==r.y&&s<(r.next.x-r.x)*(o-r.y)/(r.next.y-r.y)+r.x&&(n=!n),r=r.next;while(r!==i);return n})(t,e)&&(Be(t.prev,t,e.prev)||Be(t,e.prev,e))||$a(t,e)&&Be(t.prev,t,t.next)>0&&Be(e.prev,e,e.next)>0)}function Be(t,e,i){return(e.y-t.y)*(i.x-e.x)-(e.x-t.x)*(i.y-e.y)}function $a(t,e){return t.x===e.x&&t.y===e.y}function xh(t,e,i,a){let r=ya(Be(t,e,i)),n=ya(Be(t,e,a)),s=ya(Be(i,a,t)),o=ya(Be(i,a,e));return r!==n&&s!==o||!(r!==0||!xa(t,i,e))||!(n!==0||!xa(t,a,e))||!(s!==0||!xa(i,t,a))||!(o!==0||!xa(i,e,a))}function xa(t,e,i){return e.x<=Math.max(t.x,i.x)&&e.x>=Math.min(t.x,i.x)&&e.y<=Math.max(t.y,i.y)&&e.y>=Math.min(t.y,i.y)}function ya(t){return t>0?1:t<0?-1:0}function zr(t,e){return Be(t.prev,t,t.next)<0?Be(t,e,t.next)>=0&&Be(t,t.prev,e)>=0:Be(t,e,t.prev)<0||Be(t,t.next,e)<0}function yh(t,e){let i=new as(t.i,t.x,t.y),a=new as(e.i,e.x,e.y),r=t.next,n=e.prev;return t.next=e,e.prev=t,i.next=r,r.prev=i,a.next=i,i.prev=a,n.next=a,a.prev=n,a}function al(t,e,i,a){let r=new as(t,e,i);return a?(r.next=a.next,r.prev=a,a.next.prev=r,a.next=r):(r.prev=r,r.next=r),r}function Br(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function as(t,e,i){this.i=t,this.x=e,this.y=i,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}var sr=class Sh{static area(e){let i=e.length,a=0;for(let r=i-1,n=0;n<i;r=n++)a+=e[r].x*e[n].y-e[n].x*e[r].y;return .5*a}static isClockWise(e){return Sh.area(e)<0}static triangulateShape(e,i){let a=[],r=[],n=[];nl(e),sl(a,e);let s=e.length;i.forEach(nl);for(let l=0;l<i.length;l++)r.push(s),s+=i[l].length,sl(a,i[l]);let o=Nd(a,r);for(let l=0;l<o.length;l+=3)n.push(o.slice(l,l+3));return n}};function nl(t){let e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function sl(t,e){for(let i=0;i<e.length;i++)t.push(e[i].x),t.push(e[i].y)}var Vd=class Mh extends Xe{constructor(e=new vh([new se(.5,.5),new se(-.5,.5),new se(-.5,-.5),new se(.5,-.5)]),i={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:i},e=Array.isArray(e)?e:[e];let a=this,r=[],n=[];for(let o=0,l=e.length;o<l;o++)s(e[o]);function s(o){let l=[],h=i.curveSegments!==void 0?i.curveSegments:12,u=i.steps!==void 0?i.steps:1,d=i.depth!==void 0?i.depth:1,c=i.bevelEnabled===void 0||i.bevelEnabled,p=i.bevelThickness!==void 0?i.bevelThickness:.2,m=i.bevelSize!==void 0?i.bevelSize:p-.1,_=i.bevelOffset!==void 0?i.bevelOffset:0,v=i.bevelSegments!==void 0?i.bevelSegments:3,f=i.extrudePath,g=i.UVGenerator!==void 0?i.UVGenerator:kd,x,y,C,T,A,F=!1;f&&(x=f.getSpacedPoints(u),F=!0,c=!1,y=f.computeFrenetFrames(u,!1),C=new w,T=new w,A=new w),c||(v=0,p=0,m=0,_=0);let L=o.extractPoints(h),B=L.shape,G=L.holes;if(!sr.isClockWise(B)){B=B.reverse();for(let U=0,D=G.length;U<D;U++){let I=G[U];sr.isClockWise(I)&&(G[U]=I.reverse())}}let R=sr.triangulateShape(B,G),X=B;for(let U=0,D=G.length;U<D;U++){let I=G[U];B=B.concat(I)}function W(U,D,I){return D||console.error("THREE.ExtrudeGeometry: vec does not exist"),U.clone().addScaledVector(D,I)}let ae=B.length,ce=R.length;function ne(U,D,I){let Q,Z,E,K=U.x-D.x,H=U.y-D.y,j=I.x-U.x,ie=I.y-U.y,ue=K*K+H*H,de=K*ie-H*j;if(Math.abs(de)>Number.EPSILON){let pe=Math.sqrt(ue),xe=Math.sqrt(j*j+ie*ie),me=D.x-H/pe,Le=D.y+K/pe,fe=((I.x-ie/xe-me)*ie-(I.y+j/xe-Le)*j)/(K*ie-H*j);Q=me+K*fe-U.x,Z=Le+H*fe-U.y;let be=Q*Q+Z*Z;if(be<=2)return new se(Q,Z);E=Math.sqrt(be/2)}else{let pe=!1;K>Number.EPSILON?j>Number.EPSILON&&(pe=!0):K<-Number.EPSILON?j<-Number.EPSILON&&(pe=!0):Math.sign(H)===Math.sign(ie)&&(pe=!0),pe?(Q=-H,Z=K,E=Math.sqrt(ue)):(Q=K,Z=H,E=Math.sqrt(ue/2))}return new se(Q/E,Z/E)}let q=[];for(let U=0,D=X.length,I=D-1,Q=U+1;U<D;U++,I++,Q++)I===D&&(I=0),Q===D&&(Q=0),q[U]=ne(X[U],X[I],X[Q]);let J=[],z,$=q.concat();for(let U=0,D=G.length;U<D;U++){let I=G[U];z=[];for(let Q=0,Z=I.length,E=Z-1,K=Q+1;Q<Z;Q++,E++,K++)E===Z&&(E=0),K===Z&&(K=0),z[Q]=ne(I[Q],I[E],I[K]);J.push(z),$=$.concat(z)}for(let U=0;U<v;U++){let D=U/v,I=p*Math.cos(D*Math.PI/2),Q=m*Math.sin(D*Math.PI/2)+_;for(let Z=0,E=X.length;Z<E;Z++){let K=W(X[Z],q[Z],Q);S(K.x,K.y,-I)}for(let Z=0,E=G.length;Z<E;Z++){let K=G[Z];z=J[Z];for(let H=0,j=K.length;H<j;H++){let ie=W(K[H],z[H],Q);S(ie.x,ie.y,-I)}}}let le=m+_;for(let U=0;U<ae;U++){let D=c?W(B[U],$[U],le):B[U];F?(T.copy(y.normals[0]).multiplyScalar(D.x),C.copy(y.binormals[0]).multiplyScalar(D.y),A.copy(x[0]).add(T).add(C),S(A.x,A.y,A.z)):S(D.x,D.y,0)}for(let U=1;U<=u;U++)for(let D=0;D<ae;D++){let I=c?W(B[D],$[D],le):B[D];F?(T.copy(y.normals[U]).multiplyScalar(I.x),C.copy(y.binormals[U]).multiplyScalar(I.y),A.copy(x[U]).add(T).add(C),S(A.x,A.y,A.z)):S(I.x,I.y,d/u*U)}for(let U=v-1;U>=0;U--){let D=U/v,I=p*Math.cos(D*Math.PI/2),Q=m*Math.sin(D*Math.PI/2)+_;for(let Z=0,E=X.length;Z<E;Z++){let K=W(X[Z],q[Z],Q);S(K.x,K.y,d+I)}for(let Z=0,E=G.length;Z<E;Z++){let K=G[Z];z=J[Z];for(let H=0,j=K.length;H<j;H++){let ie=W(K[H],z[H],Q);F?S(ie.x,ie.y+x[u-1].y,x[u-1].x+I):S(ie.x,ie.y,d+I)}}}function M(U,D){let I=U.length;for(;--I>=0;){let Q=I,Z=I-1;Z<0&&(Z=U.length-1);for(let E=0,K=u+2*v;E<K;E++){let H=ae*E,j=ae*(E+1);te(D+Q+H,D+Z+H,D+Z+j,D+Q+j)}}}function S(U,D,I){l.push(U),l.push(D),l.push(I)}function N(U,D,I){P(U),P(D),P(I);let Q=r.length/3,Z=g.generateTopUV(a,r,Q-3,Q-2,Q-1);O(Z[0]),O(Z[1]),O(Z[2])}function te(U,D,I,Q){P(U),P(D),P(Q),P(D),P(I),P(Q);let Z=r.length/3,E=g.generateSideWallUV(a,r,Z-6,Z-3,Z-2,Z-1);O(E[0]),O(E[1]),O(E[3]),O(E[1]),O(E[2]),O(E[3])}function P(U){r.push(l[3*U+0]),r.push(l[3*U+1]),r.push(l[3*U+2])}function O(U){n.push(U.x),n.push(U.y)}(function(){let U=r.length/3;if(c){let D=0,I=ae*D;for(let Q=0;Q<ce;Q++){let Z=R[Q];N(Z[2]+I,Z[1]+I,Z[0]+I)}D=u+2*v,I=ae*D;for(let Q=0;Q<ce;Q++){let Z=R[Q];N(Z[0]+I,Z[1]+I,Z[2]+I)}}else{for(let D=0;D<ce;D++){let I=R[D];N(I[2],I[1],I[0])}for(let D=0;D<ce;D++){let I=R[D];N(I[0]+ae*u,I[1]+ae*u,I[2]+ae*u)}}a.addGroup(U,r.length/3-U,0)})(),(function(){let U=r.length/3,D=0;M(X,D),D+=X.length;for(let I=0,Q=G.length;I<Q;I++){let Z=G[I];M(Z,D),D+=Z.length}a.addGroup(U,r.length/3-U,1)})()}this.setAttribute("position",new Me(r,3)),this.setAttribute("uv",new Me(n,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(i,a,r){if(r.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let o=i[n];r.shapes.push(o.uuid)}else r.shapes.push(i.uuid);return r.options=Object.assign({},a),a.extrudePath!==void 0&&(r.options.extrudePath=a.extrudePath.toJSON()),r})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,i){let a=[];for(let n=0,s=e.shapes.length;n<s;n++){let o=i[e.shapes[n]];a.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Va[r.type]().fromJSON(r)),new Mh(a,e.options)}},kd={generateTopUV:function(t,e,i,a,r){let n=e[3*i],s=e[3*i+1],o=e[3*a],l=e[3*a+1],h=e[3*r],u=e[3*r+1];return[new se(n,s),new se(o,l),new se(h,u)]},generateSideWallUV:function(t,e,i,a,r,n){let s=e[3*i],o=e[3*i+1],l=e[3*i+2],h=e[3*a],u=e[3*a+1],d=e[3*a+2],c=e[3*r],p=e[3*r+1],m=e[3*r+2],_=e[3*n],v=e[3*n+1],f=e[3*n+2];return Math.abs(o-u)<Math.abs(s-h)?[new se(s,1-l),new se(h,1-d),new se(c,1-m),new se(_,1-f)]:[new se(o,1-l),new se(u,1-d),new se(p,1-m),new se(v,1-f)]}},Wd=class Eh extends Gr{constructor(e=1,i=0){let a=(1+Math.sqrt(5))/2;super([-1,a,0,1,a,0,-1,-a,0,1,-a,0,0,-1,a,0,1,a,0,-1,-a,0,1,-a,a,0,-1,a,0,1,-a,0,-1,-a,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,i),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:i}}static fromJSON(e){return new Eh(e.radius,e.detail)}},Xd=class Th extends Gr{constructor(e=1,i=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,i),this.type="OctahedronGeometry",this.parameters={radius:e,detail:i}}static fromJSON(e){return new Th(e.radius,e.detail)}},qd=class bh extends Xe{constructor(e=.5,i=1,a=32,r=1,n=0,s=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:i,thetaSegments:a,phiSegments:r,thetaStart:n,thetaLength:s},a=Math.max(3,a);let o=[],l=[],h=[],u=[],d=e,c=(i-e)/(r=Math.max(1,r)),p=new w,m=new se;for(let _=0;_<=r;_++){for(let v=0;v<=a;v++){let f=n+v/a*s;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),h.push(0,0,1),m.x=(p.x/i+1)/2,m.y=(p.y/i+1)/2,u.push(m.x,m.y)}d+=c}for(let _=0;_<r;_++){let v=_*(a+1);for(let f=0;f<a;f++){let g=f+v,x=g,y=g+a+1,C=g+a+2,T=g+1;o.push(x,y,T),o.push(y,C,T)}}this.setIndex(o),this.setAttribute("position",new Me(l,3)),this.setAttribute("normal",new Me(h,3)),this.setAttribute("uv",new Me(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bh(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},jd=class wh extends Xe{constructor(e=new vh([new se(0,.5),new se(-.5,-.5),new se(.5,-.5)]),i=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:i};let a=[],r=[],n=[],s=[],o=0,l=0;if(Array.isArray(e)===!1)h(e);else for(let u=0;u<e.length;u++)h(e[u]),this.addGroup(o,l,u),o+=l,l=0;function h(u){let d=r.length/3,c=u.extractPoints(i),p=c.shape,m=c.holes;sr.isClockWise(p)===!1&&(p=p.reverse());for(let v=0,f=m.length;v<f;v++){let g=m[v];sr.isClockWise(g)===!0&&(m[v]=g.reverse())}let _=sr.triangulateShape(p,m);for(let v=0,f=m.length;v<f;v++){let g=m[v];p=p.concat(g)}for(let v=0,f=p.length;v<f;v++){let g=p[v];r.push(g.x,g.y,0),n.push(0,0,1),s.push(g.x,g.y)}for(let v=0,f=_.length;v<f;v++){let g=_[v],x=g[0]+d,y=g[1]+d,C=g[2]+d;a.push(x,y,C),l+=3}}this.setIndex(a),this.setAttribute("position",new Me(r,3)),this.setAttribute("normal",new Me(n,3)),this.setAttribute("uv",new Me(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(i,a){if(a.shapes=[],Array.isArray(i))for(let r=0,n=i.length;r<n;r++){let s=i[r];a.shapes.push(s.uuid)}else a.shapes.push(i.uuid);return a})(this.parameters.shapes,e)}static fromJSON(e,i){let a=[];for(let r=0,n=e.shapes.length;r<n;r++){let s=i[e.shapes[r]];a.push(s)}return new wh(a,e.curveSegments)}},Yd=class Ah extends Xe{constructor(e=1,i=32,a=16,r=0,n=2*Math.PI,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:a,phiStart:r,phiLength:n,thetaStart:s,thetaLength:o},i=Math.max(3,Math.floor(i)),a=Math.max(2,Math.floor(a));let l=Math.min(s+o,Math.PI),h=0,u=[],d=new w,c=new w,p=[],m=[],_=[],v=[];for(let f=0;f<=a;f++){let g=[],x=f/a,y=0;f===0&&s===0?y=.5/i:f===a&&l===Math.PI&&(y=-.5/i);for(let C=0;C<=i;C++){let T=C/i;d.x=-e*Math.cos(r+T*n)*Math.sin(s+x*o),d.y=e*Math.cos(s+x*o),d.z=e*Math.sin(r+T*n)*Math.sin(s+x*o),m.push(d.x,d.y,d.z),c.copy(d).normalize(),_.push(c.x,c.y,c.z),v.push(T+y,1-x),g.push(h++)}u.push(g)}for(let f=0;f<a;f++)for(let g=0;g<i;g++){let x=u[f][g+1],y=u[f][g],C=u[f+1][g],T=u[f+1][g+1];(f!==0||s>0)&&p.push(x,y,T),(f!==a-1||l<Math.PI)&&p.push(y,C,T)}this.setIndex(p),this.setAttribute("position",new Me(m,3)),this.setAttribute("normal",new Me(_,3)),this.setAttribute("uv",new Me(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ah(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Zd=class Rh extends Gr{constructor(e=1,i=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,i),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:i}}static fromJSON(e){return new Rh(e.radius,e.detail)}},Kd=class Ch extends Xe{constructor(e=1,i=.4,a=12,r=48,n=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:i,radialSegments:a,tubularSegments:r,arc:n},a=Math.floor(a),r=Math.floor(r);let s=[],o=[],l=[],h=[],u=new w,d=new w,c=new w;for(let p=0;p<=a;p++)for(let m=0;m<=r;m++){let _=m/r*n,v=p/a*Math.PI*2;d.x=(e+i*Math.cos(v))*Math.cos(_),d.y=(e+i*Math.cos(v))*Math.sin(_),d.z=i*Math.sin(v),o.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),c.subVectors(d,u).normalize(),l.push(c.x,c.y,c.z),h.push(m/r),h.push(p/a)}for(let p=1;p<=a;p++)for(let m=1;m<=r;m++){let _=(r+1)*p+m-1,v=(r+1)*(p-1)+m-1,f=(r+1)*(p-1)+m,g=(r+1)*p+m;s.push(_,v,g),s.push(v,f,g)}this.setIndex(s),this.setAttribute("position",new Me(o,3)),this.setAttribute("normal",new Me(l,3)),this.setAttribute("uv",new Me(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ch(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Jd=class Ph extends Xe{constructor(e=1,i=.4,a=64,r=8,n=2,s=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:i,tubularSegments:a,radialSegments:r,p:n,q:s},a=Math.floor(a),r=Math.floor(r);let o=[],l=[],h=[],u=[],d=new w,c=new w,p=new w,m=new w,_=new w,v=new w,f=new w;for(let x=0;x<=a;++x){let y=x/a*n*Math.PI*2;g(y,n,s,e,p),g(y+.01,n,s,e,m),v.subVectors(m,p),f.addVectors(m,p),_.crossVectors(v,f),f.crossVectors(_,v),_.normalize(),f.normalize();for(let C=0;C<=r;++C){let T=C/r*Math.PI*2,A=-i*Math.cos(T),F=i*Math.sin(T);d.x=p.x+(A*f.x+F*_.x),d.y=p.y+(A*f.y+F*_.y),d.z=p.z+(A*f.z+F*_.z),l.push(d.x,d.y,d.z),c.subVectors(d,p).normalize(),h.push(c.x,c.y,c.z),u.push(x/a),u.push(C/r)}}for(let x=1;x<=a;x++)for(let y=1;y<=r;y++){let C=(r+1)*(x-1)+(y-1),T=(r+1)*x+(y-1),A=(r+1)*x+y,F=(r+1)*(x-1)+y;o.push(C,T,F),o.push(T,A,F)}function g(x,y,C,T,A){let F=Math.cos(x),L=Math.sin(x),B=C/y*x,G=Math.cos(B);A.x=T*(2+G)*.5*F,A.y=T*(2+G)*L*.5,A.z=T*Math.sin(B)*.5}this.setIndex(o),this.setAttribute("position",new Me(l,3)),this.setAttribute("normal",new Me(h,3)),this.setAttribute("uv",new Me(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ph(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},$d=class Lh extends Xe{constructor(e=new oh(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),i=64,a=1,r=8,n=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:i,radius:a,radialSegments:r,closed:n};let s=e.computeFrenetFrames(i,n);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;let o=new w,l=new w,h=new se,u=new w,d=[],c=[],p=[],m=[];function _(v){u=e.getPointAt(v/i,u);let f=s.normals[v],g=s.binormals[v];for(let x=0;x<=r;x++){let y=x/r*Math.PI*2,C=Math.sin(y),T=-Math.cos(y);l.x=T*f.x+C*g.x,l.y=T*f.y+C*g.y,l.z=T*f.z+C*g.z,l.normalize(),c.push(l.x,l.y,l.z),o.x=u.x+a*l.x,o.y=u.y+a*l.y,o.z=u.z+a*l.z,d.push(o.x,o.y,o.z)}}(function(){for(let v=0;v<i;v++)_(v);_(n===!1?i:0),(function(){for(let v=0;v<=i;v++)for(let f=0;f<=r;f++)h.x=v/i,h.y=f/r,p.push(h.x,h.y)})(),(function(){for(let v=1;v<=i;v++)for(let f=1;f<=r;f++){let g=(r+1)*(v-1)+(f-1),x=(r+1)*v+(f-1),y=(r+1)*v+f,C=(r+1)*(v-1)+f;m.push(g,x,C),m.push(x,y,C)}})()})(),this.setIndex(m),this.setAttribute("position",new Me(d,3)),this.setAttribute("normal",new Me(c,3)),this.setAttribute("uv",new Me(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Lh(new Va[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Qd=class extends Xe{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){let e=[],i=new Set,a=new w,r=new w;if(t.index!==null){let n=t.attributes.position,s=t.index,o=t.groups;o.length===0&&(o=[{start:0,count:s.count,materialIndex:0}]);for(let l=0,h=o.length;l<h;++l){let u=o[l],d=u.start;for(let c=d,p=d+u.count;c<p;c+=3)for(let m=0;m<3;m++){let _=s.getX(c+m),v=s.getX(c+(m+1)%3);a.fromBufferAttribute(n,_),r.fromBufferAttribute(n,v),ol(a,r,i)===!0&&(e.push(a.x,a.y,a.z),e.push(r.x,r.y,r.z))}}}else{let n=t.attributes.position;for(let s=0,o=n.count/3;s<o;s++)for(let l=0;l<3;l++){let h=3*s+l,u=3*s+(l+1)%3;a.fromBufferAttribute(n,h),r.fromBufferAttribute(n,u),ol(a,r,i)===!0&&(e.push(a.x,a.y,a.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new Me(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};function ol(t,e,i){let a=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`;return i.has(a)!==!0&&i.has(r)!==!0&&(i.add(a),i.add(r),!0)}var bf=Object.freeze({__proto__:null,BoxGeometry:Ka,CapsuleGeometry:Ad,CircleGeometry:Rd,ConeGeometry:Cd,CylinderGeometry:ph,DodecahedronGeometry:Pd,EdgesGeometry:Ld,ExtrudeGeometry:Vd,IcosahedronGeometry:Wd,LatheGeometry:hh,OctahedronGeometry:Xd,PlaneGeometry:Dt,PolyhedronGeometry:Gr,RingGeometry:qd,ShapeGeometry:jd,SphereGeometry:Yd,TetrahedronGeometry:Zd,TorusGeometry:Kd,TorusKnotGeometry:Jd,TubeGeometry:$d,WireframeGeometry:Qd});function Sa(t,e,i){return!t||!i&&t.constructor===e?t:typeof e.BYTES_PER_ELEMENT=="number"?new e(t):Array.prototype.slice.call(t)}function ep(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}var Qa=class{constructor(t,e,i,a){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=a!==void 0?a:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,a=e[i],r=e[i-1];t:{e:{let n;i:{r:if(!(t<a)){for(let s=i+2;;){if(a===void 0){if(t<r)break r;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===s)break;if(r=a,a=e[++i],t<a)break e}n=e.length;break i}if(t>=r)break t;{let s=e[1];t<s&&(i=2,r=s);for(let o=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===o)break;if(a=r,r=e[--i-1],t>=r)break e}n=i,i=0}}for(;i<n;){let s=i+n>>>1;t<e[s]?n=s:i=s+1}if(a=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(a===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,a)}return this.interpolate_(i,r,t,a)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,a=this.valueSize,r=t*a;for(let n=0;n!==a;++n)e[n]=i[r+n];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},tp=class extends Qa{constructor(t,e,i,a){super(t,e,i,a),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:oo,endingEnd:oo}}intervalChanged_(t,e,i){let a=this.parameterPositions,r=t-2,n=t+1,s=a[r],o=a[n];if(s===void 0)switch(this.getSettings_().endingStart){case lo:r=t,s=2*e-i;break;case ho:r=a.length-2,s=e+a[r]-a[r+1];break;default:r=t,s=i}if(o===void 0)switch(this.getSettings_().endingEnd){case lo:n=t,o=2*i-e;break;case ho:n=1,o=i+a[1]-a[0];break;default:n=t-1,o=e}let l=.5*(i-e),h=this.valueSize;this._weightPrev=l/(e-s),this._weightNext=l/(o-i),this._offsetPrev=r*h,this._offsetNext=n*h}interpolate_(t,e,i,a){let r=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=t*s,l=o-s,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,c=this._weightNext,p=(i-e)/(a-e),m=p*p,_=m*p,v=-d*_+2*d*m-d*p,f=(1+d)*_+(-1.5-2*d)*m+(-.5+d)*p+1,g=(-1-c)*_+(1.5+c)*m+.5*p,x=c*_-c*m;for(let y=0;y!==s;++y)r[y]=v*n[h+y]+f*n[l+y]+g*n[o+y]+x*n[u+y];return r}},ip=class extends Qa{constructor(t,e,i,a){super(t,e,i,a)}interpolate_(t,e,i,a){let r=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=t*s,l=o-s,h=(i-e)/(a-e),u=1-h;for(let d=0;d!==s;++d)r[d]=n[l+d]*u+n[o+d]*h;return r}},rp=class extends Qa{constructor(t,e,i,a){super(t,e,i,a)}interpolate_(t){return this.copySampleValue_(t-1)}},Yt=class{constructor(t,e,i,a){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Sa(e,this.TimeBufferType),this.values=Sa(i,this.ValueBufferType),this.setInterpolation(a||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Sa(t.times,Array),values:Sa(t.values,Array)};let a=t.getInterpolation();a!==t.DefaultInterpolation&&(i.interpolation=a)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new rp(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ip(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new tp(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Da:e=this.InterpolantFactoryMethodDiscrete;break;case Ia:e=this.InterpolantFactoryMethodLinear;break;case dn:e=this.InterpolantFactoryMethodSmooth}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(t===this.DefaultInterpolation)throw new Error(i);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Da;case this.InterpolantFactoryMethodLinear:return Ia;case this.InterpolantFactoryMethodSmooth:return dn}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,a=e.length;i!==a;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,a=e.length;i!==a;++i)e[i]*=t}return this}trim(t,e){let i=this.times,a=i.length,r=0,n=a-1;for(;r!==a&&i[r]<t;)++r;for(;n!==-1&&i[n]>e;)--n;if(++n,r!==0||n!==a){r>=n&&(n=Math.max(n,1),r=n-1);let s=this.getValueSize();this.times=i.slice(r,n),this.values=this.values.slice(r*s,n*s)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!=0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,a=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let n=null;for(let s=0;s!==r;s++){let o=i[s];if(typeof o=="number"&&isNaN(o)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,s,o),t=!1;break}if(n!==null&&n>o){console.error("THREE.KeyframeTrack: Out of order keys.",this,s,o,n),t=!1;break}n=o}if(a!==void 0&&ep(a))for(let s=0,o=a.length;s!==o;++s){let l=a[s];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,s,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),a=this.getInterpolation()===dn,r=t.length-1,n=1;for(let s=1;s<r;++s){let o=!1,l=t[s];if(l!==t[s+1]&&(s!==1||l!==t[0]))if(a)o=!0;else{let h=s*i,u=h-i,d=h+i;for(let c=0;c!==i;++c){let p=e[h+c];if(p!==e[u+c]||p!==e[d+c]){o=!0;break}}}if(o){if(s!==n){t[n]=t[s];let h=s*i,u=n*i;for(let d=0;d!==i;++d)e[u+d]=e[h+d]}++n}}if(r>0){t[n]=t[r];for(let s=r*i,o=n*i,l=0;l!==i;++l)e[o+l]=e[s+l];++n}return n!==t.length?(this.times=t.slice(0,n),this.values=e.slice(0,n*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=new this.constructor(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Yt.prototype.TimeBufferType=Float32Array,Yt.prototype.ValueBufferType=Float32Array,Yt.prototype.DefaultInterpolation=Ia;var br=class extends Yt{};br.prototype.ValueTypeName="bool",br.prototype.ValueBufferType=Array,br.prototype.DefaultInterpolation=Da,br.prototype.InterpolantFactoryMethodLinear=void 0,br.prototype.InterpolantFactoryMethodSmooth=void 0;var ap=class extends Yt{};ap.prototype.ValueTypeName="color";var np=class extends Yt{};np.prototype.ValueTypeName="number";var sp=class extends Qa{constructor(t,e,i,a){super(t,e,i,a)}interpolate_(t,e,i,a){let r=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=(i-e)/(a-e),l=t*s;for(let h=l+s;l!==h;l+=4)hi.slerpFlat(r,0,n,l-s,n,l,o);return r}},Hn=class extends Yt{InterpolantFactoryMethodLinear(t){return new sp(this.times,this.values,this.getValueSize(),t)}};Hn.prototype.ValueTypeName="quaternion",Hn.prototype.DefaultInterpolation=Ia,Hn.prototype.InterpolantFactoryMethodSmooth=void 0;var wr=class extends Yt{};wr.prototype.ValueTypeName="string",wr.prototype.ValueBufferType=Array,wr.prototype.DefaultInterpolation=Da,wr.prototype.InterpolantFactoryMethodLinear=void 0,wr.prototype.InterpolantFactoryMethodSmooth=void 0;var op=class extends Yt{};op.prototype.ValueTypeName="vector";var lp=class{constructor(t,e,i){let a=this,r,n=!1,s=0,o=0,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){o++,n===!1&&a.onStart!==void 0&&a.onStart(h,s,o),n=!0},this.itemEnd=function(h){s++,a.onProgress!==void 0&&a.onProgress(h,s,o),s===o&&(n=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(h){a.onError!==void 0&&a.onError(h)},this.resolveURL=function(h){return r?r(h):h},this.setURLModifier=function(h){return r=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let c=l[u],p=l[u+1];if(c.global&&(c.lastIndex=0),c.test(h))return p}return null}}},hp=new lp,up=class{constructor(t){this.manager=t!==void 0?t:hp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise((function(a,r){i.load(t,a,e,r)}))}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};up.DEFAULT_MATERIAL_NAME="__DEFAULT";var wf=new Pe,Af=new w,Rf=new w,Cf=new Pe,Pf=new w,Lf=new w,Nf=new Pe,Uf=new Pe,Df=new Pe,If=new w,Of=new hi,Ff=new w,zf=new w,Bf=new w,Hf=new hi,Gf=new w,Vf=new w,gs="\\[\\]\\.:\\/",cp=new RegExp("["+gs+"]","g"),Gn="[^"+gs+"]",dp="[^"+gs.replace("\\.","")+"]",pp=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Gn)+/(WCOD+)?/.source.replace("WCOD",dp)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gn)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gn)+"$"),fp=["material","materials","bones","map"],ke=class $i{constructor(e,i,a){this.path=i,this.parsedPath=a||$i.parseTrackName(i),this.node=$i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,i,a){return e&&e.isAnimationObjectGroup?new $i.Composite(e,i,a):new $i(e,i,a)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(cp,"")}static parseTrackName(e){let i=pp.exec(e);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let a={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},r=a.nodeName&&a.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let n=a.nodeName.substring(r+1);fp.indexOf(n)!==-1&&(a.nodeName=a.nodeName.substring(0,r),a.objectName=n)}if(a.propertyName===null||a.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return a}static findNode(e,i){if(i===void 0||i===""||i==="."||i===-1||i===e.name||i===e.uuid)return e;if(e.skeleton){let a=e.skeleton.getBoneByName(i);if(a!==void 0)return a}if(e.children){let a=function(n){for(let s=0;s<n.length;s++){let o=n[s];if(o.name===i||o.uuid===i)return o;let l=a(o.children);if(l)return l}return null},r=a(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,i){e[i]=this.targetObject[this.propertyName]}_getValue_array(e,i){let a=this.resolvedProperty;for(let r=0,n=a.length;r!==n;++r)e[i++]=a[r]}_getValue_arrayElement(e,i){e[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,i){this.resolvedProperty.toArray(e,i)}_setValue_direct(e,i){this.targetObject[this.propertyName]=e[i]}_setValue_direct_setNeedsUpdate(e,i){this.targetObject[this.propertyName]=e[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,i){this.targetObject[this.propertyName]=e[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,i){let a=this.resolvedProperty;for(let r=0,n=a.length;r!==n;++r)a[r]=e[i++]}_setValue_array_setNeedsUpdate(e,i){let a=this.resolvedProperty;for(let r=0,n=a.length;r!==n;++r)a[r]=e[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,i){let a=this.resolvedProperty;for(let r=0,n=a.length;r!==n;++r)a[r]=e[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,i){this.resolvedProperty[this.propertyIndex]=e[i]}_setValue_arrayElement_setNeedsUpdate(e,i){this.resolvedProperty[this.propertyIndex]=e[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,i){this.resolvedProperty[this.propertyIndex]=e[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,i){this.resolvedProperty.fromArray(e,i)}_setValue_fromArray_setNeedsUpdate(e,i){this.resolvedProperty.fromArray(e,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,i){this.resolvedProperty.fromArray(e,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,i){this.bind(),this.getValue(e,i)}_setValue_unbound(e,i){this.bind(),this.setValue(e,i)}bind(){let e=this.node,i=this.parsedPath,a=i.objectName,r=i.propertyName,n=i.propertyIndex;if(e||(e=$i.findNode(this.rootNode,i.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(a){let h=i.objectIndex;switch(a){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===h){h=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[a]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[a]}if(h!==void 0){if(e[h]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[h]}}let s=e[r];if(s===void 0){let h=i.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+r+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(n!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[n]!==void 0&&(n=e.morphTargetDictionary[n])}l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=n}else s.fromArray!==void 0&&s.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ke.Composite=class{constructor(t,e,i){let a=i||ke.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,a)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,a=this._bindings[i];a!==void 0&&a.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let a=this._targetGroup.nCachedObjects_,r=i.length;a!==r;++a)i[a].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},ke.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ke.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ke.prototype.GetterByBindingType=[ke.prototype._getValue_direct,ke.prototype._getValue_array,ke.prototype._getValue_arrayElement,ke.prototype._getValue_toArray],ke.prototype.SetterByBindingTypeAndVersioning=[[ke.prototype._setValue_direct,ke.prototype._setValue_direct_setNeedsUpdate,ke.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ke.prototype._setValue_array,ke.prototype._setValue_array_setNeedsUpdate,ke.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ke.prototype._setValue_arrayElement,ke.prototype._setValue_arrayElement_setNeedsUpdate,ke.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ke.prototype._setValue_fromArray,ke.prototype._setValue_fromArray_setNeedsUpdate,ke.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var kf=new Float32Array(1),Wf=new se,Xf=new w,qf=new w,jf=new w,Yf=new w,Zf=new Pe,Kf=new Pe,Jf=new w,$f=new Ue,Qf=new Ue,em=new w,tm=new w,im=new w,rm=new w,am=new cs,nm=new ui,sm=new w;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"161"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="161");window.__FIRINCI_SCENE="loading";var ka=document.getElementById("scene"),ll=document.getElementById("fallback"),Nr=document.querySelector(".gate"),hl=document.getElementById("scrollHint"),Ca=window.matchMedia("(prefers-reduced-motion: reduce)").matches,en=matchMedia("(pointer: coarse)").matches,mr=en||matchMedia("(max-width: 860px)").matches,mp=mr?1800:2048,ul={cephe:"assets/img/cephe.jpg",ic:"assets/img/ic-mekan.jpg"},Nh=52,Ei=16,ai=12,Rr={u0:.323,u1:.588,v0:.552,v1:.93},cl={yatay:{zoom:.96,y:-.95},dikey:{zoom:1,y:-.6}},Wa=7,Ma=null,Pa={x:.3,y:.13,z:.22},Ea=en?{ac0:.22,ac1:.58,son0:.58,son1:.72}:{ac0:.15,ac1:.42,son0:.42,son1:.58},ir=6,Zi=(t,e,i)=>t+(e-t)*i,Uh=(t,e,i)=>Math.min(i,Math.max(e,t)),Dh=t=>Uh(t,0,1),kt=(t,e,i)=>Dh((t-e)/(i-e)),Vn=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,Xa=t=>(t-.5)*Ei,qa=t=>(.5-t)*ai,ge={x0:Xa(Rr.u0),x1:Xa(Rr.u1),y0:qa(Rr.v1),y1:qa(Rr.v0)};ge.cx=(ge.x0+ge.x1)/2;ge.cy=(ge.y0+ge.y1)/2;function Ih(){document.documentElement.classList.add("scene-ready")}function Oh(){window.__FIRINCI_SCENE="fail",ka&&(ka.style.display="none"),ll&&(ll.hidden=!1),Ih()}function dl(t){return new Promise((e,i)=>{let a=new Image;a.decoding="async",a.onload=()=>e(a),a.onerror=()=>i(new Error("y\xFCklenemedi: "+t)),a.src=t})}function pl(t){let e=Math.min(1,mp/Math.max(t.naturalWidth,t.naturalHeight));if(e===1)return t;let i=document.createElement("canvas");return i.width=Math.round(t.naturalWidth*e),i.height=Math.round(t.naturalHeight*e),i.getContext("2d").drawImage(t,0,0,i.width,i.height),i}var pt,li,Ct,fl,Ur,Ri,La,ns,Fh,Pt={x:0,y:0,tx:0,ty:0},ss=10,zh=-1,Dr=0,qt=0,os=!0,or=mr?1:Math.min(devicePixelRatio,1.5),gp=Math.min(devicePixelRatio,mr?1.25:1.5),ml=!mr,Ta=0,kn=performance.now(),_p=500,Bh=performance.now(),ls=0;function Na(t){Bh=performance.now(),t&&!ml&&pt&&(ml=!0,Gh(gp))}function _s(t,e,i,a,r){let n=t.attributes.uv;for(let s=0;s<n.count;s++){let o=n.getX(s),l=n.getY(s);n.setXY(s,e+o*(i-e),1-r+l*(r-a))}n.needsUpdate=!0}function ba(t,e,i,a,r){let n=Xa(e),s=Xa(i),o=qa(r),l=qa(a),h=new Dt(s-n,l-o);_s(h,e,i,a,r);let u=new Ze(h,t);return u.position.set((n+s)/2,(o+l)/2,0),u}function gl(t,e,i,a){let r=new Dt(Ei+ir*2,i-e);_s(r,0,1,a,a);let n=new Ze(r,t);return n.position.set(0,(e+i)/2,0),n}function _l(t,e,i,a){let r=new Dt(i-e,ai);_s(r,a,a,0,1);let n=new Ze(r,t);return n.position.set((e+i)/2,0,0),n}function vp(t){let e=new si({map:t}),i=Rr;li.add(ba(e,0,1,0,i.v0),ba(e,0,1,i.v1,1),ba(e,0,i.u0,i.v0,i.v1),ba(e,i.u1,1,i.v0,i.v1),gl(e,-ai/2-ir,-ai/2,1),gl(e,ai/2,ai/2+ir,0),_l(e,-Ei/2-ir,-Ei/2,0),_l(e,Ei/2,Ei/2+ir,1))}function xp(t,e,i){Ma&&(Ma.traverse(m=>{m.geometry&&m.geometry.dispose()}),li.remove(Ma));let a=new er;Ma=a;let r=-Wa,n=ge.cx-e/2,s=ge.cx+e/2,o=ge.cy-i/2,l=ge.cy+i/2,h=new Ze(new Dt(e,i),new si({map:t}));h.position.set(ge.cx,ge.cy,r),a.add(h);let u=new si({color:"#0A0C07",side:eu}),d=(m,_,v,f)=>{let g=new Float32Array([m.x,m.y,m.z,_.x,_.y,_.z,v.x,v.y,v.z,m.x,m.y,m.z,v.x,v.y,v.z,f.x,f.y,f.z]),x=new Xe;x.setAttribute("position",new vt(g,3)),a.add(new Ze(x,u))},c=(m,_,v)=>({x:m,y:_,z:v}),p=-.05;d(c(ge.x0,ge.y1,p),c(ge.x1,ge.y1,p),c(s,l,r),c(n,l,r)),d(c(ge.x0,ge.y0,p),c(n,o,r),c(s,o,r),c(ge.x1,ge.y0,p)),d(c(ge.x0,ge.y1,p),c(n,l,r),c(n,o,r),c(ge.x0,ge.y0,p)),d(c(ge.x1,ge.y1,p),c(ge.x1,ge.y0,p),c(s,o,r),c(s,l,r)),li.add(a)}function yp(){let t=(ge.x1-ge.x0)/2,e=ge.y1-ge.y0,i=new si({color:"#9FB8C6",transparent:!0,opacity:.13,depthWrite:!1}),a=new si({color:"#0B0D07"}),r=()=>{let n=new er;n.add(new Ze(new Dt(t,e),i));let s=(o,l,h,u)=>{let d=new Ze(new Dt(o,l),a);d.position.set(h,u,.01),n.add(d)};return s(.055,e,-t/2+.03,0),s(.055,e,t/2-.03,0),s(t,.05,0,e/2-.03),s(.035,e*.22,t/2-.26,-e*.05),n.position.z=-.06,li.add(n),n};La=r(),ns=r()}function Sp(){let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),i=e.createRadialGradient(128,128,6,128,128,128);i.addColorStop(0,"rgba(255,206,132,.7)"),i.addColorStop(.5,"rgba(255,176,90,.2)"),i.addColorStop(1,"rgba(255,160,60,0)"),e.fillStyle=i,e.fillRect(0,0,256,256);let a=new Sd(t);a.colorSpace=je,Ur=new Ze(new Dt((ge.x1-ge.x0)*1.25,(ge.y1-ge.y0)*1.15),new si({map:a,transparent:!0,opacity:0,blending:Ds,depthWrite:!1})),Ur.position.set(ge.cx,ge.cy,-1.2),li.add(Ur);let r=mr?120:220,n=new Float32Array(r*3);for(let o=0;o<r;o++)n[o*3]=ge.cx+(Math.random()-.5)*8,n[o*3+1]=ge.cy+(Math.random()-.5)*6,n[o*3+2]=-Math.random()*Wa;let s=new Xe;s.setAttribute("position",new vt(n,3)),Ri=new yd(s,new rh({color:"#FFDCA8",size:.05,transparent:!0,opacity:.3,depthWrite:!1,blending:Ds})),li.add(Ri)}function Hh(){let t=Math.tan(hu.degToRad(Nh)/2),e=innerWidth/innerHeight,i=innerHeight>innerWidth?cl.dikey:cl.yatay;ss=Math.min(ai/(2*t),Ei/(2*t*e))*i.zoom;let a=ss*t,r=Pa.y+.3,n=Math.max(0,ai/2+ir-a-r);zh=Uh(i.y,-n,n);let s=ge.x1-ge.x0+2*Wa*t*e,o=ge.y1-ge.y0+2*Wa*t,l=Math.max(s,o*(4/3))*1.06;xp(Fh,l,l*(3/4))}function Mp(t,e){pt=new ih({canvas:ka,antialias:!0,powerPreference:"high-performance"}),pt.setPixelRatio(or),pt.setSize(innerWidth,innerHeight),pt.outputColorSpace=je,pt.toneMapping=jt,pt.setClearColor("#070903"),fl=pt.capabilities.getMaxAnisotropy(),li=new vd,Ct=new gt(Nh,innerWidth/innerHeight,.05,300);let i=r=>{let n=new _t(r);return n.colorSpace=je,n.anisotropy=fl,n.needsUpdate=!0,n},a=i(pl(t));Fh=i(pl(e)),vp(a),yp(),Sp(),Hh()}function Ep(t){let e=Vn(kt(t,0,.5)),i=Vn(kt(t,.48,1));if(Ct.position.set(Zi(Zi(0,ge.cx,e),ge.cx,i),Zi(Zi(zh,ge.cy,e),ge.cy,i),Zi(Zi(ss,2.4,e),-.6,i)),La){let a=(ge.x1-ge.x0)/2,r=Vn(kt(t,Ea.ac0,Ea.ac1))*a;La.position.set(ge.cx-a/2-r,ge.cy,-.06),ns.position.set(ge.cx+a/2+r,ge.cy,-.06);let n=1-kt(t,Ea.son0,Ea.son1);La.visible=ns.visible=n>.02}Ur&&(Ur.material.opacity=.22*kt(t,.12,.6)*(1-kt(t,.75,1))),Ri&&(Ri.material.opacity=.1+.28*kt(t,.25,.8))}function Tp(t){hl&&(hl.style.opacity=String(1-kt(t,.03,.2)));var _gi=document.querySelector(".gate__inside");_gi&&_gi.classList.toggle("is-on",t>.48);document.documentElement.style.setProperty("--gate-p",t.toFixed(3))}function vl(){if(!Nr)return 0;let t=Nr.offsetHeight-innerHeight;return Dh(-Nr.getBoundingClientRect().top/Math.max(1,t))}function Ua(t){Ep(t),Tp(t);let e=1-kt(t,.5,.9)*.85;if(!Ca){let i=ls;Ct.position.x+=Math.sin(i*.2)*Pa.x*e,Ct.position.y+=Math.sin(i*.16+1.3)*Pa.y*e,Ct.position.z+=Math.sin(i*.12+2.1)*Pa.z*e}Ct.position.x+=Pt.x*.32*e,Ct.position.y-=Pt.y*.2*e,pt.render(li,Ct)}function Gh(t){Math.abs(t-or)<.05||(or=t,pt.setPixelRatio(or),pt.setSize(innerWidth,innerHeight))}function bp(){!("IntersectionObserver"in window)||!Nr||new IntersectionObserver(t=>{os=t[0].isIntersecting,os&&Na()},{threshold:0}).observe(Nr)}function Vh(){if(requestAnimationFrame(Vh),!os)return;let t=performance.now();if(Math.abs(Dr-qt)<5e-4&&t-Bh>_p){kn=t;return}let e=t-kn;kn=t,e>26?++Ta>40&&(Gh(Math.max(1,or-.25)),Ta=0):Ta>0&&Ta--,ls+=Math.min(e,50)/1e3;let i=ls;qt+=(Dr-qt)*(en?.2:.085),Ri&&(Ri.position.y=Math.sin(i*.26)*.16,Ri.position.x=Math.cos(i*.19)*.13),Pt.x+=(Pt.tx-Pt.x)*.05,Pt.y+=(Pt.ty-Pt.y)*.05,Ua(qt)}async function wp(){let[t,e]=await Promise.all([dl(ul.cephe),dl(ul.ic)]);Mp(t,e),Dr=qt=vl(),Ua(qt),window.__FIRINCI_SCENE="ok",Ih(),console.info("[F\u0131r\u0131nc\u0131] 3B sahne aktif."),bp(),Ca||Vh(),addEventListener("scroll",()=>{Dr=vl(),Na(!0),Ca&&(qt=Dr,Ua(qt))},{passive:!0});let i=innerWidth,a=innerHeight;addEventListener("resize",()=>{Na(!0);let r=Math.abs(innerWidth-i),n=Math.abs(innerHeight-a);i=innerWidth,a=innerHeight,Ct.aspect=innerWidth/innerHeight,Ct.updateProjectionMatrix(),pt.setPixelRatio(or),pt.setSize(innerWidth,innerHeight),mr&&r===0&&n<140||Hh(),Ca&&Ua(qt)}),en||addEventListener("pointermove",r=>{Pt.tx=r.clientX/innerWidth*2-1,Pt.ty=r.clientY/innerHeight*2-1,Na(!0)},{passive:!0}),ka.addEventListener("webglcontextlost",r=>{r.preventDefault(),Oh()})}function Ap(){wp().catch(t=>{console.warn("[F\u0131r\u0131nc\u0131] 3B sahne ba\u015Flat\u0131lamad\u0131:",t),Oh()})}Ap();
