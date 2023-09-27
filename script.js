    document.addEventListener('DOMContentLoaded', async function () {
        // Extract partner ID from the meta tag
        var partnerIdMeta = document.querySelector('meta[name="mocaverse-partner-id"]');
        if (!partnerIdMeta) {
        console.error('Partner ID not found in meta tag.');
        return;
        }
        const partnerId = partnerIdMeta.getAttribute('content');
        // Validate the client using the provided hostname and partner ID
        const hostname = window.location.hostname;
        const isValid = await validateClient(hostname, partnerId);
        // const isValid =true


        // Render the "Join Mocaverse" button if validation is successful
        const joinButton = document.querySelector('.btn-join');

        if (isValid) {
            joinButton.style.display = 'flex';
        } else {
            joinButton.remove();
            console.error('Invalid hostname or partner ID.');
        }
    });

    async function validateClient(hostname, partnerId) {
        console.log(1,hostname,partnerId)
        const response = await fetch(`/api/verifyPartner?host=${hostname}&partnerId=${partnerId}`);
        const data = await response.json();
        return data.valid;
    }

    const response = await fetch('/generateToken');
    const dataToken = await response.json();

    async function openClaimSite() {

        const isValid = await validateClient(hostname, partnerId);

        if (isValid) {
            if (dataToken.jwt) {
                const encodedJwt = encodeURIComponent(data.jwt);

                const claimSiteUrl = `https://mocaverse.com/claim?PartnerToken=${encodedJwt}`;

                window.open(claimSiteUrl, '_blank');
            } else {
                console.error('JWT not available.');
            }
        } else {
        console.error('Invalid hostname or partner ID.');
        }
    }

    // handle remove section

    const notificationMoca = document.querySelector('.notification-moca');
    function handleClose() {
        notificationMoca.remove();
    }