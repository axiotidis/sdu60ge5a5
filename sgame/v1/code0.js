gdjs.New_32sceneCode = {};
gdjs.New_32sceneCode.forEachIndex2 = 0;

gdjs.New_32sceneCode.forEachObjects2 = [];

gdjs.New_32sceneCode.forEachTemporary2 = null;

gdjs.New_32sceneCode.forEachTotalCount2 = 0;

gdjs.New_32sceneCode.GDplayerObjectObjects1= [];
gdjs.New_32sceneCode.GDplayerObjectObjects2= [];
gdjs.New_32sceneCode.GDplayerObjectObjects3= [];
gdjs.New_32sceneCode.GDtextObject1Objects1= [];
gdjs.New_32sceneCode.GDtextObject1Objects2= [];
gdjs.New_32sceneCode.GDtextObject1Objects3= [];
gdjs.New_32sceneCode.GDNewObjectObjects1= [];
gdjs.New_32sceneCode.GDNewObjectObjects2= [];
gdjs.New_32sceneCode.GDNewObjectObjects3= [];
gdjs.New_32sceneCode.GDtextObject2Objects1= [];
gdjs.New_32sceneCode.GDtextObject2Objects2= [];
gdjs.New_32sceneCode.GDtextObject2Objects3= [];
gdjs.New_32sceneCode.GDBoushObjects1= [];
gdjs.New_32sceneCode.GDBoushObjects2= [];
gdjs.New_32sceneCode.GDBoushObjects3= [];
gdjs.New_32sceneCode.GDCloudObjects1= [];
gdjs.New_32sceneCode.GDCloudObjects2= [];
gdjs.New_32sceneCode.GDCloudObjects3= [];
gdjs.New_32sceneCode.GDCoinObjects1= [];
gdjs.New_32sceneCode.GDCoinObjects2= [];
gdjs.New_32sceneCode.GDCoinObjects3= [];
gdjs.New_32sceneCode.GDScoreTextObjects1= [];
gdjs.New_32sceneCode.GDScoreTextObjects2= [];
gdjs.New_32sceneCode.GDScoreTextObjects3= [];
gdjs.New_32sceneCode.GDSlimeObjectObjects1= [];
gdjs.New_32sceneCode.GDSlimeObjectObjects2= [];
gdjs.New_32sceneCode.GDSlimeObjectObjects3= [];
gdjs.New_32sceneCode.GDleftObjects1= [];
gdjs.New_32sceneCode.GDleftObjects2= [];
gdjs.New_32sceneCode.GDleftObjects3= [];
gdjs.New_32sceneCode.GDrightObjects1= [];
gdjs.New_32sceneCode.GDrightObjects2= [];
gdjs.New_32sceneCode.GDrightObjects3= [];
gdjs.New_32sceneCode.GDcheckpointObjects1= [];
gdjs.New_32sceneCode.GDcheckpointObjects2= [];
gdjs.New_32sceneCode.GDcheckpointObjects3= [];
gdjs.New_32sceneCode.GDleftMoveObjects1= [];
gdjs.New_32sceneCode.GDleftMoveObjects2= [];
gdjs.New_32sceneCode.GDleftMoveObjects3= [];
gdjs.New_32sceneCode.GDupMoveObjects1= [];
gdjs.New_32sceneCode.GDupMoveObjects2= [];
gdjs.New_32sceneCode.GDupMoveObjects3= [];
gdjs.New_32sceneCode.GDrightMoveObjects1= [];
gdjs.New_32sceneCode.GDrightMoveObjects2= [];
gdjs.New_32sceneCode.GDrightMoveObjects3= [];

gdjs.New_32sceneCode.conditionTrue_0 = {val:false};
gdjs.New_32sceneCode.condition0IsTrue_0 = {val:false};
gdjs.New_32sceneCode.condition1IsTrue_0 = {val:false};
gdjs.New_32sceneCode.condition2IsTrue_0 = {val:false};


gdjs.New_32sceneCode.eventsList0x72790c = function(runtimeScene) {

{

gdjs.New_32sceneCode.GDplayerObjectObjects2.createFrom(gdjs.New_32sceneCode.GDplayerObjectObjects1);


gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDplayerObjectObjects2.length;i<l;++i) {
    if ( gdjs.New_32sceneCode.GDplayerObjectObjects2[i].getBehavior("PlatformerObject").isMoving() ) {
        gdjs.New_32sceneCode.condition0IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDplayerObjectObjects2[k] = gdjs.New_32sceneCode.GDplayerObjectObjects2[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDplayerObjectObjects2.length = k;}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDplayerObjectObjects2 */
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjectObjects2.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjectObjects2[i].setAnimationName("Running");
}
}}

}


{

/* Reuse gdjs.New_32sceneCode.GDplayerObjectObjects1 */

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDplayerObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.New_32sceneCode.GDplayerObjectObjects1[i].getBehavior("PlatformerObject").isMoving()) ) {
        gdjs.New_32sceneCode.condition0IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDplayerObjectObjects1[k] = gdjs.New_32sceneCode.GDplayerObjectObjects1[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDplayerObjectObjects1.length = k;}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDplayerObjectObjects1 */
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjectObjects1[i].setAnimationName("Idle");
}
}}

}


}; //End of gdjs.New_32sceneCode.eventsList0x72790c
gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDplayerObjectObjects1Objects = Hashtable.newFrom({"playerObject": gdjs.New_32sceneCode.GDplayerObjectObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDCoinObjects1Objects = Hashtable.newFrom({"Coin": gdjs.New_32sceneCode.GDCoinObjects1});gdjs.New_32sceneCode.eventsList0x72803c = function(runtimeScene) {

}; //End of gdjs.New_32sceneCode.eventsList0x72803c
gdjs.New_32sceneCode.eventsList0x727f34 = function(runtimeScene) {

{

/* Reuse gdjs.New_32sceneCode.GDCoinObjects1 */

for(gdjs.New_32sceneCode.forEachIndex2 = 0;gdjs.New_32sceneCode.forEachIndex2 < gdjs.New_32sceneCode.GDCoinObjects1.length;++gdjs.New_32sceneCode.forEachIndex2) {
gdjs.New_32sceneCode.GDCoinObjects2.length = 0;


gdjs.New_32sceneCode.forEachTemporary2 = gdjs.New_32sceneCode.GDCoinObjects1[gdjs.New_32sceneCode.forEachIndex2];
gdjs.New_32sceneCode.GDCoinObjects2.push(gdjs.New_32sceneCode.forEachTemporary2);
if (true) {
{runtimeScene.getVariables().get("Score").add(100);
}{gdjs.evtTools.sound.playSound(runtimeScene, "coin.wav", false, 100, 1);
}{for(var i = 0, len = gdjs.New_32sceneCode.GDCoinObjects2.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDCoinObjects2[i].deleteFromScene(runtimeScene);
}
}}
}

}


}; //End of gdjs.New_32sceneCode.eventsList0x727f34
gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDSlimeObjectObjects1Objects = Hashtable.newFrom({"SlimeObject": gdjs.New_32sceneCode.GDSlimeObjectObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDrightObjects1Objects = Hashtable.newFrom({"right": gdjs.New_32sceneCode.GDrightObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDSlimeObjectObjects1Objects = Hashtable.newFrom({"SlimeObject": gdjs.New_32sceneCode.GDSlimeObjectObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDleftObjects1Objects = Hashtable.newFrom({"left": gdjs.New_32sceneCode.GDleftObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDplayerObjectObjects1Objects = Hashtable.newFrom({"playerObject": gdjs.New_32sceneCode.GDplayerObjectObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDSlimeObjectObjects1Objects = Hashtable.newFrom({"SlimeObject": gdjs.New_32sceneCode.GDSlimeObjectObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDplayerObjectObjects1Objects = Hashtable.newFrom({"playerObject": gdjs.New_32sceneCode.GDplayerObjectObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDSlimeObjectObjects1Objects = Hashtable.newFrom({"SlimeObject": gdjs.New_32sceneCode.GDSlimeObjectObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDplayerObjectObjects1Objects = Hashtable.newFrom({"playerObject": gdjs.New_32sceneCode.GDplayerObjectObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDcheckpointObjects1Objects = Hashtable.newFrom({"checkpoint": gdjs.New_32sceneCode.GDcheckpointObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDleftMoveObjects1Objects = Hashtable.newFrom({"leftMove": gdjs.New_32sceneCode.GDleftMoveObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDrightMoveObjects1Objects = Hashtable.newFrom({"rightMove": gdjs.New_32sceneCode.GDrightMoveObjects1});gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDupMoveObjects1Objects = Hashtable.newFrom({"upMove": gdjs.New_32sceneCode.GDupMoveObjects1});gdjs.New_32sceneCode.eventsList0x5b7028 = function(runtimeScene) {

{

gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDplayerObjectObjects1.length;i<l;++i) {
    if ( gdjs.New_32sceneCode.GDplayerObjectObjects1[i].getBehavior("PlatformerObject").isJumping() ) {
        gdjs.New_32sceneCode.condition0IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDplayerObjectObjects1[k] = gdjs.New_32sceneCode.GDplayerObjectObjects1[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDplayerObjectObjects1.length = k;}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDplayerObjectObjects1 */
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjectObjects1[i].setAnimationName("Jumping");
}
}}

}


{

gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDplayerObjectObjects1.length;i<l;++i) {
    if ( gdjs.New_32sceneCode.GDplayerObjectObjects1[i].getBehavior("PlatformerObject").isFalling() ) {
        gdjs.New_32sceneCode.condition0IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDplayerObjectObjects1[k] = gdjs.New_32sceneCode.GDplayerObjectObjects1[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDplayerObjectObjects1.length = k;}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDplayerObjectObjects1 */
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjectObjects1[i].setAnimationName("Jumping");
}
}}

}


{

gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDplayerObjectObjects1.length;i<l;++i) {
    if ( gdjs.New_32sceneCode.GDplayerObjectObjects1[i].getBehavior("PlatformerObject").isOnFloor() ) {
        gdjs.New_32sceneCode.condition0IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDplayerObjectObjects1[k] = gdjs.New_32sceneCode.GDplayerObjectObjects1[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDplayerObjectObjects1.length = k;}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {

{ //Subevents
gdjs.New_32sceneCode.eventsList0x72790c(runtimeScene);} //End of subevents
}

}


{

gdjs.New_32sceneCode.GDCoinObjects1.createFrom(runtimeScene.getObjects("Coin"));
gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDplayerObjectObjects1Objects, gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDCoinObjects1Objects, false, runtimeScene, false);
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {

{ //Subevents
gdjs.New_32sceneCode.eventsList0x727f34(runtimeScene);} //End of subevents
}

}


{


{
gdjs.New_32sceneCode.GDScoreTextObjects1.createFrom(runtimeScene.getObjects("ScoreText"));
{for(var i = 0, len = gdjs.New_32sceneCode.GDScoreTextObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDScoreTextObjects1[i].setString("Score : " + gdjs.evtTools.common.toString(gdjs.evtTools.common.getVariableNumber(runtimeScene.getVariables().get("Score"))));
}
}}

}


{


gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
gdjs.New_32sceneCode.GDleftObjects1.createFrom(runtimeScene.getObjects("left"));
gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));
gdjs.New_32sceneCode.GDrightObjects1.createFrom(runtimeScene.getObjects("right"));
{for(var i = 0, len = gdjs.New_32sceneCode.GDleftObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDleftObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.New_32sceneCode.GDrightObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDrightObjects1[i].hide();
}
}{runtimeScene.getVariables().getFromIndex(0).setNumber((( gdjs.New_32sceneCode.GDplayerObjectObjects1.length === 0 ) ? 0 :gdjs.New_32sceneCode.GDplayerObjectObjects1[0].getPointX("")));
}{runtimeScene.getVariables().get("checkpointY").setNumber((( gdjs.New_32sceneCode.GDplayerObjectObjects1.length === 0 ) ? 0 :gdjs.New_32sceneCode.GDplayerObjectObjects1[0].getPointY("")));
}}

}


{

gdjs.New_32sceneCode.GDSlimeObjectObjects1.createFrom(runtimeScene.getObjects("SlimeObject"));
gdjs.New_32sceneCode.GDrightObjects1.createFrom(runtimeScene.getObjects("right"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDSlimeObjectObjects1Objects, gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDrightObjects1Objects, false, runtimeScene, false);
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDSlimeObjectObjects1 */
{for(var i = 0, len = gdjs.New_32sceneCode.GDSlimeObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].returnVariable(gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].getVariables().getFromIndex(0)).setString("right");
}
}}

}


{

gdjs.New_32sceneCode.GDSlimeObjectObjects1.createFrom(runtimeScene.getObjects("SlimeObject"));
gdjs.New_32sceneCode.GDleftObjects1.createFrom(runtimeScene.getObjects("left"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDSlimeObjectObjects1Objects, gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDleftObjects1Objects, false, runtimeScene, false);
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDSlimeObjectObjects1 */
{for(var i = 0, len = gdjs.New_32sceneCode.GDSlimeObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].returnVariable(gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].getVariables().getFromIndex(0)).setString("left");
}
}}

}


{

gdjs.New_32sceneCode.GDSlimeObjectObjects1.createFrom(runtimeScene.getObjects("SlimeObject"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDSlimeObjectObjects1.length;i<l;++i) {
    if ( gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].getVariableString(gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].getVariables().getFromIndex(0)) == "left" ) {
        gdjs.New_32sceneCode.condition0IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDSlimeObjectObjects1[k] = gdjs.New_32sceneCode.GDSlimeObjectObjects1[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDSlimeObjectObjects1.length = k;}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDSlimeObjectObjects1 */
{for(var i = 0, len = gdjs.New_32sceneCode.GDSlimeObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].addPolarForce(180, 100, 0);
}
}{for(var i = 0, len = gdjs.New_32sceneCode.GDSlimeObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].flipX(false);
}
}}

}


{

gdjs.New_32sceneCode.GDSlimeObjectObjects1.createFrom(runtimeScene.getObjects("SlimeObject"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDSlimeObjectObjects1.length;i<l;++i) {
    if ( gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].getVariableString(gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].getVariables().getFromIndex(0)) == "right" ) {
        gdjs.New_32sceneCode.condition0IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDSlimeObjectObjects1[k] = gdjs.New_32sceneCode.GDSlimeObjectObjects1[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDSlimeObjectObjects1.length = k;}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDSlimeObjectObjects1 */
{for(var i = 0, len = gdjs.New_32sceneCode.GDSlimeObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].addPolarForce(0, 100, 0);
}
}{for(var i = 0, len = gdjs.New_32sceneCode.GDSlimeObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].flipX(true);
}
}}

}


{

gdjs.New_32sceneCode.GDSlimeObjectObjects1.createFrom(runtimeScene.getObjects("SlimeObject"));
gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
gdjs.New_32sceneCode.condition1IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDplayerObjectObjects1Objects, gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDSlimeObjectObjects1Objects, false, runtimeScene, false);
}if ( gdjs.New_32sceneCode.condition0IsTrue_0.val ) {
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDplayerObjectObjects1.length;i<l;++i) {
    if ( gdjs.New_32sceneCode.GDplayerObjectObjects1[i].getBehavior("PlatformerObject").isFalling() ) {
        gdjs.New_32sceneCode.condition1IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDplayerObjectObjects1[k] = gdjs.New_32sceneCode.GDplayerObjectObjects1[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDplayerObjectObjects1.length = k;}}
if (gdjs.New_32sceneCode.condition1IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDSlimeObjectObjects1 */
/* Reuse gdjs.New_32sceneCode.GDplayerObjectObjects1 */
{for(var i = 0, len = gdjs.New_32sceneCode.GDSlimeObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDSlimeObjectObjects1[i].deleteFromScene(runtimeScene);
}
}{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjectObjects1[i].getBehavior("PlatformerObject").setCanJump();
}
}{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjectObjects1[i].getBehavior("PlatformerObject").simulateJumpKey();
}
}}

}


{

gdjs.New_32sceneCode.GDSlimeObjectObjects1.createFrom(runtimeScene.getObjects("SlimeObject"));
gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
gdjs.New_32sceneCode.condition1IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDplayerObjectObjects1Objects, gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDSlimeObjectObjects1Objects, false, runtimeScene, false);
}if ( gdjs.New_32sceneCode.condition0IsTrue_0.val ) {
{
for(var i = 0, k = 0, l = gdjs.New_32sceneCode.GDplayerObjectObjects1.length;i<l;++i) {
    if ( gdjs.New_32sceneCode.GDplayerObjectObjects1[i].getBehavior("PlatformerObject").isOnFloor() ) {
        gdjs.New_32sceneCode.condition1IsTrue_0.val = true;
        gdjs.New_32sceneCode.GDplayerObjectObjects1[k] = gdjs.New_32sceneCode.GDplayerObjectObjects1[i];
        ++k;
    }
}
gdjs.New_32sceneCode.GDplayerObjectObjects1.length = k;}}
if (gdjs.New_32sceneCode.condition1IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDplayerObjectObjects1 */
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjectObjects1[i].setPosition(0,0);
}
}}

}


{

gdjs.New_32sceneCode.GDcheckpointObjects1.createFrom(runtimeScene.getObjects("checkpoint"));
gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDplayerObjectObjects1Objects, gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDcheckpointObjects1Objects, false, runtimeScene, false);
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
/* Reuse gdjs.New_32sceneCode.GDcheckpointObjects1 */
{runtimeScene.getVariables().getFromIndex(0).setNumber((( gdjs.New_32sceneCode.GDcheckpointObjects1.length === 0 ) ? 0 :gdjs.New_32sceneCode.GDcheckpointObjects1[0].getPointX("")));
}{runtimeScene.getVariables().get("checkpointY").setNumber((( gdjs.New_32sceneCode.GDcheckpointObjects1.length === 0 ) ? 0 :gdjs.New_32sceneCode.GDcheckpointObjects1[0].getPointY("")));
}}

}


{

gdjs.New_32sceneCode.GDleftMoveObjects1.createFrom(runtimeScene.getObjects("leftMove"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.input.cursorOnObject(gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDleftMoveObjects1Objects, runtimeScene, true, false);
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjectObjects1[i].addForce(-(100), 0, 0);
}
}}

}


{

gdjs.New_32sceneCode.GDrightMoveObjects1.createFrom(runtimeScene.getObjects("rightMove"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.input.cursorOnObject(gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDrightMoveObjects1Objects, runtimeScene, true, false);
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjectObjects1[i].addForce(100, 0, 0);
}
}}

}


{

gdjs.New_32sceneCode.GDupMoveObjects1.createFrom(runtimeScene.getObjects("upMove"));

gdjs.New_32sceneCode.condition0IsTrue_0.val = false;
{
gdjs.New_32sceneCode.condition0IsTrue_0.val = gdjs.evtTools.input.cursorOnObject(gdjs.New_32sceneCode.mapOfGDgdjs_46New_9532sceneCode_46GDupMoveObjects1Objects, runtimeScene, true, false);
}if (gdjs.New_32sceneCode.condition0IsTrue_0.val) {
gdjs.New_32sceneCode.GDplayerObjectObjects1.createFrom(runtimeScene.getObjects("playerObject"));
{for(var i = 0, len = gdjs.New_32sceneCode.GDplayerObjectObjects1.length ;i < len;++i) {
    gdjs.New_32sceneCode.GDplayerObjectObjects1[i].getBehavior("PlatformerObject").simulateJumpKey();
}
}}

}


}; //End of gdjs.New_32sceneCode.eventsList0x5b7028


gdjs.New_32sceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.New_32sceneCode.GDplayerObjectObjects1.length = 0;
gdjs.New_32sceneCode.GDplayerObjectObjects2.length = 0;
gdjs.New_32sceneCode.GDplayerObjectObjects3.length = 0;
gdjs.New_32sceneCode.GDtextObject1Objects1.length = 0;
gdjs.New_32sceneCode.GDtextObject1Objects2.length = 0;
gdjs.New_32sceneCode.GDtextObject1Objects3.length = 0;
gdjs.New_32sceneCode.GDNewObjectObjects1.length = 0;
gdjs.New_32sceneCode.GDNewObjectObjects2.length = 0;
gdjs.New_32sceneCode.GDNewObjectObjects3.length = 0;
gdjs.New_32sceneCode.GDtextObject2Objects1.length = 0;
gdjs.New_32sceneCode.GDtextObject2Objects2.length = 0;
gdjs.New_32sceneCode.GDtextObject2Objects3.length = 0;
gdjs.New_32sceneCode.GDBoushObjects1.length = 0;
gdjs.New_32sceneCode.GDBoushObjects2.length = 0;
gdjs.New_32sceneCode.GDBoushObjects3.length = 0;
gdjs.New_32sceneCode.GDCloudObjects1.length = 0;
gdjs.New_32sceneCode.GDCloudObjects2.length = 0;
gdjs.New_32sceneCode.GDCloudObjects3.length = 0;
gdjs.New_32sceneCode.GDCoinObjects1.length = 0;
gdjs.New_32sceneCode.GDCoinObjects2.length = 0;
gdjs.New_32sceneCode.GDCoinObjects3.length = 0;
gdjs.New_32sceneCode.GDScoreTextObjects1.length = 0;
gdjs.New_32sceneCode.GDScoreTextObjects2.length = 0;
gdjs.New_32sceneCode.GDScoreTextObjects3.length = 0;
gdjs.New_32sceneCode.GDSlimeObjectObjects1.length = 0;
gdjs.New_32sceneCode.GDSlimeObjectObjects2.length = 0;
gdjs.New_32sceneCode.GDSlimeObjectObjects3.length = 0;
gdjs.New_32sceneCode.GDleftObjects1.length = 0;
gdjs.New_32sceneCode.GDleftObjects2.length = 0;
gdjs.New_32sceneCode.GDleftObjects3.length = 0;
gdjs.New_32sceneCode.GDrightObjects1.length = 0;
gdjs.New_32sceneCode.GDrightObjects2.length = 0;
gdjs.New_32sceneCode.GDrightObjects3.length = 0;
gdjs.New_32sceneCode.GDcheckpointObjects1.length = 0;
gdjs.New_32sceneCode.GDcheckpointObjects2.length = 0;
gdjs.New_32sceneCode.GDcheckpointObjects3.length = 0;
gdjs.New_32sceneCode.GDleftMoveObjects1.length = 0;
gdjs.New_32sceneCode.GDleftMoveObjects2.length = 0;
gdjs.New_32sceneCode.GDleftMoveObjects3.length = 0;
gdjs.New_32sceneCode.GDupMoveObjects1.length = 0;
gdjs.New_32sceneCode.GDupMoveObjects2.length = 0;
gdjs.New_32sceneCode.GDupMoveObjects3.length = 0;
gdjs.New_32sceneCode.GDrightMoveObjects1.length = 0;
gdjs.New_32sceneCode.GDrightMoveObjects2.length = 0;
gdjs.New_32sceneCode.GDrightMoveObjects3.length = 0;

gdjs.New_32sceneCode.eventsList0x5b7028(runtimeScene);
return;

}

gdjs['New_32sceneCode'] = gdjs.New_32sceneCode;
