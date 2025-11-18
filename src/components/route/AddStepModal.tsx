import React from 'react';
import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RouteStepInput, RouteType } from '../../types/RouteStep';
import { useRouteContext } from '../../providers/RouteProvider';

interface AddStepModalProps {
  opened: boolean,
  onClose: () => void,
}

const AddStepModal: React.FC<AddStepModalProps> = ({ opened, onClose }) => {

  const { appendRoute } = useRouteContext();

  const form = useForm<RouteStepInput>({
    initialValues: {
      name: '',
      type: '' as RouteType,
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 characters' : null),
    },
  });

  const handleSubmit = (values: RouteStepInput) => {
    const validation = form.validate();
  if (!validation.hasErrors) {
    console.log('Form submitted:', values);
    appendRoute(values);
    form.reset();
    onClose();
  }
  };


  return (
    <Modal opened={opened} onClose={onClose} title={'Add a Step'} size="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Name"
          placeholder="Enter the step name"
          {...form.getInputProps('name')}
          mb="md"
        />

        <Select
          label="Step type"
          placeholder='Pick value'
          data={Object.values(RouteType)}
          {...form.getInputProps('type')}
          mb="md"
        />

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button variant="subtle" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStepModal;