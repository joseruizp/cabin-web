$(function() {
	var STATUS = {};
	STATUS.AVALIABLE = {id:1, color:"#FFFFFF"};
	STATUS.OCUPIED = {id:2, color:"#F7FE2E"};
	STATUS.MAINTENANCE = {id:3, color:"#FF0000"};
	STATUS.RESTARTING = {id:4, color:"#64FE2E"};
	STATUS.TURNING_OFF = {id:5, color:"#A4A4A4"};
	STATUS.TURNED_OFF = {id:6, color:"#A4A4A4"};
	
    var socket = new SockJS('/cabin-web/gs-guide-websocket');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/cabin/computer', function (computerStatus) {
            updateStatus(JSON.parse(computerStatus.body));
        });
    });
    
    function updateStatus(computerStatus) {
        console.log("in updateStatus: " + computerStatus.computerId);
        $("#computer_" + computerStatus.computerId).css("background-color", getColorByStatus(computerStatus.statusId));
    }
    
    function getColorByStatus(statusId) {
    	if (STATUS.AVALIABLE.id === statusId) {
    		return STATUS.AVALIABLE.color;
    	} else if (STATUS.OCUPIED.id === statusId) {
    		return STATUS.OCUPIED.color;
    	} else if (STATUS.MAINTENANCE.id === statusId) {
    		return STATUS.MAINTENANCE.color;
    	} else if (STATUS.RESTARTING.id === statusId) {
    		return STATUS.RESTARTING.color;
    	} else if (STATUS.TURNING_OFF.id === statusId) {
    		return STATUS.TURNING_OFF.color;
    	} else if (STATUS.TURNED_OFF.id === statusId) {
    		return STATUS.TURNED_OFF.color;
    	} 
    }
});