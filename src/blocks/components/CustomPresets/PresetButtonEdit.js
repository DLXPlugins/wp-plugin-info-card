import React, { useRef, useState, useContext } from 'react';
import { Button, Popover, Modal } from '@wordpress/components';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import PresetButton from '../PresetButton/PresetButton';
import CustomPresetsContext from './context';

const PresetButtonEdit = ( props ) => {
	const {
		title,
		slug,
		setAttributes,
		attributes,
		uniqueId,
		editId,
		clientId,
		saveNonce,
		deleteNonce,
		theme,
		customFormData = {}
	} = props;
	const blockAttributes = { ...attributes };
	const { editPresets, setShowEditModal, setShowDeleteModal } = useContext( CustomPresetsContext );

	return (
		<>
			<div
				className={ classNames( 'wppic-preset-edit-container', {
					'has-preset-edit-container--edit': editPresets,
				} ) }
			>
				{ editPresets && (
					<div className="has-preset-edit-buttons">
						<Button
							variant={ 'secondary' }
							onClick={ ( e ) => {
								setShowEditModal( {
									show: true,
									editId,
									title,
									saveNonce,
								} );
							} }
							label={ __( 'Edit Color Theme', 'wp-plugin-info-card' ) }
							icon="edit"
							className="has-preset-edit-button"
						/>
						<Button
							variant={ 'secondary' }
							onClick={ ( e ) => {
								setShowDeleteModal( {
									show: true,
									editId,
									deleteNonce,
								} );
							} }
							label={ __( 'Delete Color Theme', 'wp-plugin-info-card' ) }
							icon="trash"
							className="has-preset-delete-button"
						/>
					</div>
				) }
				<PresetButton
					key={ editId }
					label={
						'' === title ? __( 'Untitled Color Theme', 'wp-plugin-info-card' ) : title
					}
					setAttributes={ setAttributes }
					uniqueId={ uniqueId }
					className="has-preset-button"
					clientId={ clientId }
					attributes={ blockAttributes }
					disabled={ editPresets }
					theme={ theme }
					customFormData={ customFormData ?? {} }
					{ ...props }
				/>
			</div>
		</>
	);
};

export default PresetButtonEdit;
