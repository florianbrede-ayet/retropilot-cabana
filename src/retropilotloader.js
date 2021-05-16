import Moment from 'moment';
import CorollaDBC from './corolla-dbc';

export async function loadRetropilotDrive(retropilotHost, driveIdentifier, seekTime) {
        if (driveIdentifier==null || driveIdentifier.length==0) {
            global.retropilotLoaded=false;
            return;
        }

        const response = await fetch(retropilotHost+'useradmin/cabana_drive/'+encodeURIComponent(driveIdentifier));
        try {
            var retropilotDrive = await response.json();
        } catch (exception) {}

        if (retropilotDrive==undefined || retropilotDrive.logUrls==undefined) {
            alert(retropilotDrive!=undefined && retropilotDrive.status!=undefined ? retropilotDrive.status : 'fetching retropilot drive failed!');
            global.retropilotLoaded=false;
            return;
        }
        global.retropilotLogUrls = retropilotDrive.logUrls;

        global.retropilotProps = {
            autoplay: true,
            startTime: seekTime,
            segments : global.retropilotLogUrls.length,
            isDemo : true,
            max: global.retropilotLogUrls.length,
            name: retropilotDrive.driveIdentifier,
            dongleId: retropilotDrive.dongleId,
            dbc: CorollaDBC,
            isDemo: true,
            dbcFilename: 'toyota_nodsu_pt_generated.dbc'    
        };

        global.retropilotRoute = {
            fullname: retropilotDrive.name,
            proclog: global.retropilotProps.max,
            start_time: Moment(global.retropilotProps.name, 'YYYY-MM-DD--H-m-s'),
            url: retropilotDrive.driveUrl
        };


        if (global.retropilotProps.max>0)
            global.retropilotLoaded=true;
        else
            global.retropilotLoaded=false;

};