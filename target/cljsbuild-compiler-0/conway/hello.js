goog.provide('conway.hello');
goog.require('cljs.core');
/**
* Returns the cell at the given coordinates
*/
conway.hello.cell = (function cell(x,y){
return document.getElementsByTagName("tr").item(x).cells.item(y);
});
conway.hello.table_size = (function table_size(){
return document.getElementsByTagName("tr").length;
});
conway.hello.get_cell_value = (function get_cell_value(x,y){
if(cljs.core._EQ_.call(null,conway.hello.cell.call(null,x,y).bgColor,"blue"))
{return 1;
} else
{return 0;
}
});
conway.hello.set_cell_value = (function set_cell_value(x,y,value){
var color = ((cljs.core._EQ_.call(null,0,value))?"white":"blue");
return conway.hello.cell.call(null,x,y).bgColor = color;
});
conway.hello.num_alive = (function num_alive(nbs){
return cljs.core.reduce.call(null,cljs.core._PLUS_,0,nbs);
});
conway.hello.valid_coords = (function valid_coords(board,x,y){
return cljs.core.filter.call(null,(function (p1__74243_SHARP_){
var and__3822__auto__ = (cljs.core.first.call(null,p1__74243_SHARP_) >= 0);
if(and__3822__auto__)
{var and__3822__auto____$1 = (cljs.core.last.call(null,p1__74243_SHARP_) >= 0);
if(and__3822__auto____$1)
{var and__3822__auto____$2 = ((cljs.core.count.call(null,board) - 1) >= cljs.core.first.call(null,p1__74243_SHARP_));
if(and__3822__auto____$2)
{return ((cljs.core.count.call(null,board) - 1) >= cljs.core.last.call(null,p1__74243_SHARP_));
} else
{return and__3822__auto____$2;
}
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
}),cljs.core.map.call(null,(function (p1__74244_SHARP_){
return cljs.core.vector.call(null,(cljs.core.first.call(null,p1__74244_SHARP_) + x),(cljs.core.last.call(null,p1__74244_SHARP_) + y));
}),cljs.core.PersistentVector.fromArray([cljs.core.PersistentVector.fromArray([-1,-1], true),cljs.core.PersistentVector.fromArray([-1,1], true),cljs.core.PersistentVector.fromArray([1,-1], true),cljs.core.PersistentVector.fromArray([1,1], true),cljs.core.PersistentVector.fromArray([0,1], true),cljs.core.PersistentVector.fromArray([1,0], true),cljs.core.PersistentVector.fromArray([-1,0], true),cljs.core.PersistentVector.fromArray([0,-1], true)], true)));
});
conway.hello.apply_state = (function apply_state(state){
var G__74248 = cljs.core.seq.call(null,cljs.core.range.call(null,0,cljs.core.count.call(null,state)));
while(true){
if(G__74248)
{var x = cljs.core.first.call(null,G__74248);
var G__74249_74250 = cljs.core.seq.call(null,cljs.core.range.call(null,0,cljs.core.count.call(null,state)));
while(true){
if(G__74249_74250)
{var y_74251 = cljs.core.first.call(null,G__74249_74250);
conway.hello.set_cell_value.call(null,x,y_74251,cljs.core.get_in.call(null,state,cljs.core.PersistentVector.fromArray([x,y_74251], true)));
{
var G__74252 = cljs.core.next.call(null,G__74249_74250);
G__74249_74250 = G__74252;
continue;
}
} else
{}
break;
}
{
var G__74253 = cljs.core.next.call(null,G__74248);
G__74248 = G__74253;
continue;
}
} else
{return null;
}
break;
}
});
conway.hello.nabes = (function nabes(state,x,y){
return cljs.core.map.call(null,(function (p1__74245_SHARP_){
return cljs.core.get_in.call(null,state,cljs.core.PersistentVector.fromArray([cljs.core.first.call(null,p1__74245_SHARP_),cljs.core.last.call(null,p1__74245_SHARP_)], true));
}),conway.hello.valid_coords.call(null,state,x,y));
});
conway.hello.initialize_board = (function initialize_board(n,f){
return cljs.core.vec.call(null,(function (){var iter__2540__auto__ = (function iter__74260(s__74261){
return (new cljs.core.LazySeq(null,false,(function (){
var s__74261__$1 = s__74261;
while(true){
if(cljs.core.seq.call(null,s__74261__$1))
{var x = cljs.core.first.call(null,s__74261__$1);
return cljs.core.cons.call(null,cljs.core.vec.call(null,(function (){var iter__2540__auto__ = ((function (x){
return (function iter__74264(s__74265){
return (new cljs.core.LazySeq(null,false,((function (x){
return (function (){
var s__74265__$1 = s__74265;
while(true){
if(cljs.core.seq.call(null,s__74265__$1))
{var y = cljs.core.first.call(null,s__74265__$1);
return cljs.core.cons.call(null,f.call(null,x,y),iter__74264.call(null,cljs.core.rest.call(null,s__74265__$1)));
} else
{return null;
}
break;
}
});})(x))
,null));
});})(x))
;
return iter__2540__auto__.call(null,cljs.core.range.call(null,0,n));
})()),iter__74260.call(null,cljs.core.rest.call(null,s__74261__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2540__auto__.call(null,cljs.core.range.call(null,0,n));
})());
});
conway.hello.random_board = (function random_board(n){
return conway.hello.initialize_board.call(null,n,(function (x,y){
return cljs.core.rand_int.call(null,2);
}));
});
conway.hello.zero_board = (function zero_board(n){
return conway.hello.initialize_board.call(null,n,cljs.core.constantly.call(null,0));
});
conway.hello.current_board = (function current_board(){
return conway.hello.initialize_board.call(null,conway.hello.table_size.call(null),(function (x,y){
return conway.hello.get_cell_value.call(null,x,y);
}));
});
conway.hello.alive_cell_next_state = (function alive_cell_next_state(alive_nabes){
if((2 > alive_nabes))
{return 0;
} else
{if(cljs.core._EQ_.call(null,2,alive_nabes))
{return 1;
} else
{if(cljs.core._EQ_.call(null,3,alive_nabes))
{return 1;
} else
{if((3 < alive_nabes))
{return 0;
} else
{return null;
}
}
}
}
});
conway.hello.next_state_for = (function next_state_for(state,x,y){
var alive_cnt = conway.hello.num_alive.call(null,conway.hello.nabes.call(null,state,x,y));
if(cljs.core._EQ_.call(null,cljs.core.get_in.call(null,state,cljs.core.PersistentVector.fromArray([x,y], true)),1))
{return conway.hello.alive_cell_next_state.call(null,alive_cnt);
} else
{if(cljs.core._EQ_.call(null,alive_cnt,3))
{return 1;
} else
{return 0;
}
}
});
conway.hello.next_tick = (function next_tick(current_state){
return conway.hello.initialize_board.call(null,cljs.core.count.call(null,current_state),cljs.core.partial.call(null,conway.hello.next_state_for,current_state));
});
conway.hello.tick = (function tick(){
return conway.hello.apply_state.call(null,conway.hello.next_tick.call(null,conway.hello.current_board.call(null)));
});
conway.hello.pb = (function pb(board){
var G__74267 = cljs.core.seq.call(null,board);
while(true){
if(G__74267)
{var row = cljs.core.first.call(null,G__74267);
cljs.core.prn.call(null,row);
{
var G__74268 = cljs.core.next.call(null,G__74267);
G__74267 = G__74268;
continue;
}
} else
{return null;
}
break;
}
});
conway.hello.setup = (function setup(){
conway.hello.apply_state.call(null,conway.hello.random_board.call(null,conway.hello.table_size.call(null)));
return window.setInterval("conway.hello.tick()",500);
});
window.onload = conway.hello.setup;
