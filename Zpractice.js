import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Vibration,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { rh, rw, rf } from '../../utils/responsive';
import { useSelector, useDispatch } from 'react-redux';
import { getAxiosWithToken } from '../../services/axios';
import { ANIMATIONS, ICONS } from '../../constants/Images';
import CircularProgressIndicator from 'react-native-circular-progress-indicator';
import { selectFasting, setUserTimeInMinsEating, setUserTimeInMinsFasting } from '../../redux/slice/FastingSlice';
import { hpp } from '../../utils/responsiveFile';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.9;
const RADIUS = CIRCLE_SIZE / 2;

interface FastingTimerProps {
  onTimerComplete?: () => void;
}
const FastingTimerScreen: React.FC<FastingTimerProps> = ({ onTimerComplete,getDashboardDataa }) => {
  const dispatch = useDispatch();
  const {
    CURRENT_WINDOW,
    USER_FASTING_TRACK,
    USER_TIME_IN_MINS_FASTING,
    USER_TIME_IN_MINS_EATING,
    USER_FASTING_SETUP,
    FASTING_PLANS
  } = useSelector(selectFasting);

  const selectedPlanId = USER_FASTING_SETUP?.planId;
  const selectedPlan = selectedPlanId ? FASTING_PLANS?.find(plan => plan.id === selectedPlanId) : null;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  // const [isRunning, setIsRunning] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const [currentPhase, setCurrentPhase] = useState('');
  const [progress, setProgress] = useState(100);
  // const [timerDisplay, setTimerDisplay] = useState('00:00:00');
  const [timerDisplay, setTimerDisplay] = useState(() => {
  const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${h}:${m}:${s}`;
});
  const [fastingSeconds, setFastingSeconds] = useState(16 * 3600);
  const [eatingSeconds, setEatingSeconds] = useState(8 * 3600);
  const [status, setstatus] = useState();
  const [loader,setLoader]=useState(false)

  // const [, setEatingSeconds] = useState();

  // const [statusCheck, setStatusCheck] = useState();
  const progressRef = useRef(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedPlan) {
      setFastingSeconds((selectedPlan.fastingWindow || 16) * 3600);
      setEatingSeconds((selectedPlan.eatingWindow || 8) * 3600);
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (CURRENT_WINDOW) {
      setCurrentPhase(CURRENT_WINDOW.toLowerCase());
    } else {
      setCurrentPhase('fasting');
    }
  }, [CURRENT_WINDOW]);

  useEffect(() => {
    if (currentPhase === 'fasting' && USER_TIME_IN_MINS_FASTING) {
      setElapsedSeconds(USER_TIME_IN_MINS_FASTING * 60);
    } else if (currentPhase === 'eating' && USER_TIME_IN_MINS_EATING) {
      setElapsedSeconds(USER_TIME_IN_MINS_EATING * 60);
    }
  }, [currentPhase, USER_TIME_IN_MINS_FASTING, USER_TIME_IN_MINS_EATING]);

  useEffect(() => {
    if (USER_FASTING_TRACK?.type === 'start') {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [USER_FASTING_TRACK]);


  // {
  //   console.log('00999-----',USER_FASTING_TRACK)
  // }

  const getActivePhaseSeconds = useCallback(() => {
    return currentPhase === 'fasting' ? fastingSeconds : eatingSeconds;
  }, [currentPhase, fastingSeconds, eatingSeconds]);

  const handlePhaseSwitch = useCallback(() => {
    Vibration.vibrate(200);
    const newPhase = currentPhase === 'fasting' ? 'eating' : 'fasting';
    setCurrentPhase(newPhase);
    setElapsedSeconds(0);

    const activePhaseSeconds = getActivePhaseSeconds();
    if (newPhase === 'fasting') {
      dispatch(setUserTimeInMinsFasting(0));
      dispatch(setUserTimeInMinsEating(activePhaseSeconds / 60));
    } else {
      dispatch(setUserTimeInMinsEating(0));
      dispatch(setUserTimeInMinsFasting(activePhaseSeconds / 60));
    }

    if (onTimerComplete) {
      onTimerComplete();
    }
  }, [currentPhase, dispatch, getActivePhaseSeconds, onTimerComplete]);

  useEffect(() => {
    if (isRunning) {
      const activePhaseSeconds = getActivePhaseSeconds();

      intervalRef.current = setInterval(() => {
        setElapsedSeconds(prev => {
          const newElapsed = prev + 1;

          if (newElapsed % 60 === 0) {
            if (currentPhase === 'fasting') {
              dispatch(setUserTimeInMinsFasting(newElapsed / 60));
            } else {
              dispatch(setUserTimeInMinsEating(newElapsed / 60));
            }
          }

          if (newElapsed >= activePhaseSeconds) {
            handlePhaseSwitch();
            return 0;
          }

          return newElapsed;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, currentPhase, dispatch, handlePhaseSwitch, getActivePhaseSeconds]);

  useEffect(() => {
    const activePhaseSeconds = getActivePhaseSeconds();
    const remainingSeconds = activePhaseSeconds - elapsedSeconds;
    const progressPercentage = (remainingSeconds / activePhaseSeconds) * 100;
    setProgress(Math.max(0, Math.min(100, progressPercentage)));

    if(isRunning){
    setTimerDisplay(formatTime(remainingSeconds));
    }
  }, [elapsedSeconds, getActivePhaseSeconds]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getCurrentTimeWindow = () => {
    return currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1);
  };
{
  console.log('---...00000.....000......01,',isRunning)
}
  const handleFasting = async () => {

console.log('parmo,,,,,,,.....',isRunning)
    try {
      if (isRunning) {
        // API call to start tracking
        const fastingResponse = await getAxiosWithToken({
          url: "pro/fastingsetuptrack",
          method: "POST"
        });
        console.log('parmod lumar ....STAR.', fastingResponse?.data)
        setstatus(fastingResponse.data)
        if (fastingResponse?.data) {
          fastingResponse.data && Alert.alert("Alert message", fastingResponse.data.message?fastingResponse.data.message:`${fastingResponse?.data?.activeWindow &&
 fastingResponse.data.activeWindow.charAt(0).toUpperCase() +
 fastingResponse.data.activeWindow.slice(1)} ${fastingResponse?.data?.type} successfully`);
        }
      }
       else {
        Alert.alert(
          "Alert Message?",
          "Are you sure you want to end your current fasting session?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "End Session",
              onPress: async () => {
                setIsRunning(false);
                console.log('vlauee....fakse ...',isRunning)
                // API call to stop fasting
                // await getAxiosWithToken({
                //   method: 'POST',
                //   url: 'pro/finishfasting',
                //   data: {
                //     status: 'finish',
                //     window: getCurrentTimeWindow()
                //   }
                // });
                const fastingResponse = await getAxiosWithToken({
          url: "pro/fastingsetuptrack",
          method: "POST"
        });
        console.log('parmod lumar ....STAR.', fastingResponse?.data)
        setstatus(fastingResponse.data)
        handleLoader()
        handleLoader()
        if (fastingResponse?.data) {
          fastingResponse.data && Alert.alert("Alert message", fastingResponse.data.message?fastingResponse.data.message:`${fastingResponse?.data?.activeWindow &&
 fastingResponse.data.activeWindow.charAt(0).toUpperCase() +
 fastingResponse.data.activeWindow.slice(1)} ${fastingResponse?.data?.type} successfully`);
        }
        // API call to End Api  tracking Note Some Api will call when api will call the type will update and will manage this with api status = type 'start' 'end'
                if (currentPhase === 'fasting') {
                  dispatch(setUserTimeInMinsFasting(0));
                } else {
                  dispatch(setUserTimeInMinsEating(0));
                }
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error toggling fasting status:', error);
    }
  };
  const getPhaseColors = () => {
    if (currentPhase === 'fasting') {
      return {
        arcColor: '#EB5307',
        accentColor: '#EB5307',
        dotColor: '#FFDDCD',
        labelText: 'Fasting Time'
      };
    } else {
      return {
        arcColor: '#23B3F1',
        accentColor: '#23B3F1',
        dotColor: '#D9F0FA',
        labelText: 'Eating Time'
      };
    }
  };

const handleLoader = () => {
  setLoader(true);
  setTimeout(() => setLoader(false), 1000);
};
  const { arcColor, accentColor, dotColor, labelText } = getPhaseColors();

  const getPhaseStatus = () => {
    if (currentPhase === 'fasting') {
      if (elapsedSeconds < 3600 * 2) {
        return 'Blood Sugar Stabilizing';
      } else if (elapsedSeconds < 3600 * 6) {
        return 'Fat Burning Mode';
      } else {
        return 'Deep Ketosis';
      }
    } else {
      return 'Feeding Period';
    }
  };

  const phaseStatus = getPhaseStatus();

  const currentAngle = -90 - (progress / 100) * 360;
  const radians = (currentAngle * Math.PI) / 180;
  const fireDotX = RADIUS + (RADIUS - 40 / 1) * Math.cos(radians) - rh(10);
  const fireDotY = RADIUS + (RADIUS - 40 / 1) * Math.sin(radians) - rh(27);

  return (
    <View>

  
    {loader ==true ? <ActivityIndicator color={'lightgray'} size={'small'}/> :
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <CircularProgressIndicator
          ref={progressRef}
          value={progress}
          radius={RADIUS}
          duration={500}
          activeStrokeWidth={66}
          inActiveStrokeWidth={66}
          activeStrokeColor={arcColor}
          inActiveStrokeColor="transparent"
          maxValue={100}
          showProgressValue={false}
          clockwise={false}
        />

        <View style={styles.thinProgressContainer}>
          <CircularProgressIndicator
            value={100}
            radius={RADIUS - 20}
            duration={500}
            activeStrokeWidth={4}
            inActiveStrokeWidth={4}
            activeStrokeColor={arcColor}
            inActiveStrokeColor="transparent"
            maxValue={100}
            showProgressValue={false}
            clockwise={false}
          />
        </View>
        {isRunning && (
          <View
            style={[
              styles.fireDot,
              {
                left: fireDotX,
                top: fireDotY,
                backgroundColor: dotColor,
              },
            ]}
          >
            <LottieView
              source={currentPhase === 'fasting' ? ANIMATIONS.FIRE : ANIMATIONS.FIRE}
              autoPlay
              loop
              style={{ width: rw(25), height: rh(25) }}
            />
          </View>
        )}










        <View style={styles.centerContent}>
            <Text style={[styles.status, { color: accentColor,marginTop:hpp(2) }]} />

          {/* <Text style={styles.label}>{labelText}</Text> */}
          <Text style={styles.label}>{labelText}</Text>
          <Text style={styles.timer}>{timerDisplay}</Text>
          <View style={styles.statusRow}>
            <LottieView
              source={ANIMATIONS.FIRE}
              autoPlay
              loop
              style={styles.statusIcon}
            />
            <Text style={[styles.status, { color: accentColor }]}>{phaseStatus}</Text>
          </View>
           <Text style={[styles.status, { color: accentColor, marginTop: hpp(2), fontSize: hpp(2) }]}>
  {(status?.type || USER_FASTING_TRACK?.type || '')
    .charAt(0)
    .toUpperCase() + (status?.type || USER_FASTING_TRACK?.type || '').slice(1)}
</Text>

        </View>
      </View>
           
            <Text style={[styles.status, { color: accentColor,marginTop:hpp(3),fontSize:hpp(1.8) }]}>Scheduled Time</Text>
            <Text style={[styles.status, { color: accentColor,fontSize:hpp(2),marginTop:hpp(.2) }]}>{getDashboardDataa?.fastingsetupuser?.eatingWindowTime?.startTime12hr}{' '}{getDashboardDataa?.fastingsetupuser?.eatingWindowTime?.endTime12hr}</Text> 
      <TouchableOpacity
        style={[styles.button, { backgroundColor: accentColor }]}
        onPress={handleFasting}
      >

        {
          console.log('parmod........',status?.type)
        }
        {
          console.log('currentPhase.....',currentPhase)
        }
         {
          console.log('parmod...USER_FASTING_TRACK?.type.....',USER_FASTING_TRACK?.type)
        }
 <Text style={styles.buttonText}>
          {isRunning
            ? (currentPhase === 'fasting' ? 'End Fasting' : 'End Eating Period')
            : (currentPhase === 'fasting' ? 'Start Fasting' : 'Start Eating Period')}
        </Text>

      </TouchableOpacity>
    </View>}
      </View>
  );
};










































const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: rh(20),
    paddingBottom: rh(0),
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  thinProgressContainer: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  label: {
    fontSize: rf(18),
    lineHeight: rf(24),
    color: '#262626',
    fontWeight: '500',
    marginBottom: rh(6),
  },
  timer: {
    fontSize: rf(46),
    lineHeight: rf(50),
    fontWeight: '800',
    color: '#262626',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rh(6),
  },
  statusIcon: {
    width: rw(20),
    height: rh(20),
    marginRight: rw(6),
  },
  status: {
    fontSize: rf(16),
    lineHeight: rf(20),
    fontWeight: '500',
  },
  button: {
    marginTop: rh(25),
    paddingHorizontal: rw(40),
    paddingVertical: rh(16),
    borderRadius: rw(20),
    width: rw(340),
    height: rh(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: rf(20),
    lineHeight: rf(24),
    fontWeight: '800',
  },
  fireDot: {
    width: rw(30),
    height: rh(30),
    borderRadius: rh(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: rh(5),
    zIndex: 10,
    position: 'absolute',
  },
  planInfoContainer: {
    marginTop: rh(20),
    alignItems: 'center',
  },
  planInfoText: {
    fontSize: rf(14),
    color: '#333333',
    marginBottom: rh(5),
  },
  planHighlight: {
    fontWeight: '700',
    color: '#EB5307',
  },
  cycleTimes: {
    fontSize: rf(12),
    color: '#666666',
    marginBottom: rh(5),
  },
  treatDayText: {
    fontSize: rf(12),
    color: '#666666',
    textTransform: 'capitalize',
  }
});

export default FastingTimerScreen;






















####################
####################
####################






Dashboard.tsx.   Screen 

        <FastingTimerScreen getDashboardDataa={getDashboardDataa}/>










