/** LoadingOverlay.js
*	By Christoph Hart
*	MIT License
*	
*	A example UI widget that appears when something is preloading.
*	It shows a rotating icon that is loaded as SVG.
*
*	Min required HISE Version: 1.2.0
*
*	In order to use it, simply create the Panel with `LoadingOverlay.createLoadingOverlay(name, x, y);`
*/

namespace LoadingOverlay
{
	const var loadingIconData = [ 110,109,0,0,92,65,0,0,176,65,98,0,0,92,65,94,186,183,65,213,120,79,65,0,0,190,65,0,0,64,65,0,0,190,65,98,43,135,48,65,0,0,190,65,0,0,36,65,94,186,183,65,0,0,36,65,0,0,176,65,98,0,0,36,65,162,69,168,65,43,135,48,65,0,0,162,65,0,0,64,65,0,0,162,65,98,213,
	120,79,65,0,0,162,65,0,0,92,65,162,69,168,65,0,0,92,65,0,0,176,65,99,109,0,0,64,65,0,0,0,0,98,4,86,46,65,0,0,0,0,0,0,32,65,66,96,101,63,0,0,32,65,0,0,0,64,98,0,0,32,65,240,167,70,64,4,86,46,65,0,0,128,64,0,0,64,65,0,0,128,64,98,252,169,81,65,0,0,128,
	64,0,0,96,65,240,167,70,64,0,0,96,65,0,0,0,64,98,0,0,96,65,64,96,101,63,252,169,81,65,0,0,0,0,0,0,64,65,0,0,0,0,99,109,0,0,176,65,0,0,44,65,98,18,131,181,65,0,0,44,65,244,253,185,65,219,249,52,65,244,253,185,65,0,0,64,65,98,244,253,185,65,61,10,75,65,
	19,131,181,65,0,0,84,65,0,0,176,65,0,0,84,65,98,225,122,170,65,0,0,84,65,12,2,166,65,86,14,75,65,12,2,166,65,0,0,64,65,98,12,2,166,65,219,249,52,65,225,122,170,65,0,0,44,65,0,0,176,65,0,0,44,65,99,109,0,0,0,0,0,0,64,65,98,0,0,0,0,20,174,81,65,66,96,101,
	63,0,0,96,65,0,0,0,64,0,0,96,65,98,240,167,70,64,0,0,96,65,0,0,128,64,20,174,81,65,0,0,128,64,0,0,64,65,98,0,0,128,64,4,86,46,65,240,167,70,64,0,0,32,65,0,0,0,64,0,0,32,65,98,64,96,101,63,0,0,32,65,0,0,0,0,4,86,46,65,0,0,0,0,0,0,64,65,99,109,0,0,152,
	65,0,0,128,64,98,115,104,156,65,0,0,128,64,0,0,160,65,53,94,142,64,0,0,160,65,0,0,160,64,98,0,0,160,65,45,178,177,64,115,104,156,65,98,16,192,64,0,0,152,65,0,0,192,64,98,141,151,147,65,0,0,192,64,0,0,144,65,45,178,177,64,0,0,144,65,98,16,160,64,98,0,
	0,144,65,53,94,142,64,141,151,147,65,0,0,128,64,0,0,152,65,0,0,128,64,99,109,0,0,152,65,0,0,140,65,98,190,159,158,65,0,0,140,65,0,0,164,65,66,96,145,65,0,0,164,65,0,0,152,65,98,0,0,164,65,190,159,158,65,190,159,158,65,12,2,164,65,231,251,151,65,0,0,164,
	65,98,65,96,145,65,0,0,164,65,0,0,140,65,203,161,158,65,0,0,140,65,12,2,152,65,98,0,0,140,65,65,96,145,65,66,96,145,65,0,0,140,65,0,0,152,65,0,0,140,65,99,109,0,0,160,64,0,0,64,64,98,248,83,195,64,0,0,64,64,0,0,224,64,16,88,121,64,0,0,224,64,0,0,160,
	64,98,0,0,224,64,248,83,195,64,248,83,195,64,0,0,224,64,207,247,159,64,0,0,224,64,98,16,88,121,64,0,0,224,64,0,0,64,64,41,92,195,64,0,0,64,64,0,0,160,64,98,0,0,64,64,174,71,121,64,16,88,121,64,0,0,64,64,0,0,160,64,0,0,64,64,99,109,0,0,160,64,0,0,136,
	65,98,248,83,195,64,0,0,136,65,0,0,224,64,2,43,143,65,0,0,224,64,0,0,152,65,98,0,0,224,64,254,212,160,65,248,83,195,64,0,0,168,65,207,247,159,64,0,0,168,65,98,16,88,121,64,0,0,168,65,0,0,64,64,10,215,160,65,0,0,64,64,0,0,152,65,98,0,0,64,64,246,40,143,
	65,16,88,121,64,0,0,136,65,0,0,160,64,0,0,136,65,99,101,0,0 ];

	const var loadingIcon = Content.createPath();
	loadingIcon.loadFromData(loadingIconData);


	inline function createLoadingOverlay(name, x, y)
	{
		local widget = Content.addPanel(name, x, y);
		Content.setPropertiesFromJSON(name, {
		"visible": false,
		"enabled": false,
		"width": 100,
		"height": 100
		});
    
		widget.setPaintRoutine(function(g)
		{
			g.setColour(Colours.white);
    	
			var size = this.getWidth();
    	
			g.setFont("Oxygen Bold", 15.0);
			g.drawAlignedText("Loading...", [0, 0, this.getWidth(), this.getHeight()], "centredBottom");
			g.rotate(this.data.v, [0.5 * size, 0.5 * size]);
			g.fillPath(loadingIcon, [0.25 * size, 0.25 * size, 0.5 * size, 0.5 * size ]);
		});
    
		widget.setTimerCallback(function()
		{
			this.data.v = this.data.v + 0.1;
			this.repaintImmediately();
		});
    
    
		widget.setLoadingCallback(function(isPreloading)
		{
			if(isPreloading)
			{
				this.data.isPreloading = isPreloading;
    		
				this.data.v = 0.0;
				this.repaintImmediately();
				this.startTimer(30);
				this.set("visible", true);
			}
			else
			{
				this.stopTimer();
				this.set("visible", false);
			}
		});
		return widget;
	};
};