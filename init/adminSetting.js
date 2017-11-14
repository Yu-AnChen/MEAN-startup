const insertAdminSettingsInit = (collection) => {
    const adminDataStructure = require('./dataStructure/adminSetting');

    const adminInitData = {
        eventName: 'Taiwan-TBA 2017',
        emailsOfAdmins: ['newevent@event.com']
    };
    
    const adminData = Object.assign({}, adminDataStructure, adminInitData);

    const lastUpdate = {
        updatedAt: new Date(),
        updatedBy: adminInitData.emailsOfAdmins[0]
    };
    const data = Object.assign(
        {}, 
        adminData, 
        { _updatedTraces: [lastUpdate] },
        { _createdAt: new Date() }
    );

    return collection
        .find({})
        .toArray()
        .then(result => 
            result.length
            ? console.log('')
            : collection.insertOne(data)
        )
        .then((docInserted) => Promise.resolve(docInserted));

};

module.exports = insertAdminSettingsInit;