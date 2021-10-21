import { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import Address from './steps/Address'
// import SocialLinks from './steps2/SocialLinks'
import PersonalInfo from './steps/PersonalInfo'
import NomineeInfo from './steps/NomineeInfo'
import { FileText, User, MapPin, Link } from 'react-feather'
import FinishStep from './steps/Finish'
import FinishReferral from './steps/FinishReferral'
import { useParams } from 'react-router-dom'

const WizardModern = () => {
  const { username } = useParams()

  const [stepper, setStepper] = useState(null)
  const ref = useRef(null)
  //Storing global form state
  const [Data, setData] = useState({})
  const updateData = (data) => {
    setData((prevData) => ({ ...prevData, ...data }))
    // return Data
  }

  const resetData = () => {
    setData({})
  }

  const steps = [
    {
      id: 'personal-info',
      title: 'Personal',
      // subtitle: 'Enter Your Account Details.',
      icon: <FileText size={18} />,
      content: <PersonalInfo updateData={updateData} resetData={resetData} Data={Data} stepper={stepper} type='wizard-modern' />
    },
    {
      id: 'step-address',
      title: 'Address',
      // subtitle: 'Add Address',
      icon: <MapPin size={18} />,
      content: <Address updateData={updateData} Data={Data} stepper={stepper} type='wizard-modern' />
    },
    {
      id: 'nominee-info',
      title: 'Nominee',
      // subtitle: 'Add Personal Info',
      icon: <User size={18} />,
      content: <NomineeInfo updateData={updateData} Data={Data} stepper={stepper} type='wizard-modern' />
    },

    {
      id: 'final-step',
      title: 'Finish',
      // subtitle: 'You are onboarded, now create your credentials to login',
      icon: <Link size={18} />,
      content: <FinishStep updateData={updateData} Data={Data} resetData={resetData} stepper={stepper} type='wizard-modern' />
    }
  ]

  const stepsReferrer = [
    {
      id: 'personal-info',
      title: 'Personal',
      // subtitle: 'Enter Your Account Details.',
      icon: <FileText size={18} />,
      content: <PersonalInfo updateData={updateData} resetData={resetData} Data={Data} stepper={stepper} type='wizard-modern' />
    },
    {
      id: 'step-address',
      title: 'Address',
      // subtitle: 'Add Address',
      icon: <MapPin size={18} />,
      content: <Address updateData={updateData} Data={Data} stepper={stepper} type='wizard-modern' />
    },
    {
      id: 'nominee-info',
      title: 'Nominee',
      // subtitle: 'Add Personal Info',
      icon: <User size={18} />,
      content: <NomineeInfo updateData={updateData} Data={Data} stepper={stepper} type='wizard-modern' />
    },

    {
      id: 'final-step',
      title: 'Finish',
      // subtitle: 'You are onboarded, now create your credentials to login',
      icon: <Link size={18} />,
      content: <FinishReferral updateData={updateData} Data={Data} resetData={resetData} username={username} stepper={stepper} type='wizard-modern' />
    }
  ]

  return (
    <div className='modern-horizontal-wizard '>
      <Wizard
        type='modern-horizontal'
        ref={ref}
        steps={(username) ? stepsReferrer : steps }
      updataData={dt => setData(dt)}
      options={{
        linear: false
      }}
      instance={el => setStepper(el)}
      />
    </div>
  )
}

export default WizardModern
